const User = require('../models/User');
const Monitor = require('../models/Monitor');
const isRoot = require('../../helpers/isRootUser');
// const isRoot = (req, callback) => {

//     // console.log(req.payload)
//     // console.log('inside is root')
//     // let id = 'lfkasjd'
//     // if (!id) callback({ message: 'login required' })
//     // else User.findById(id, (err, rootUser) => {
//     //     if (err) callback(err)
//     //     if (!rootUser) callback({ message: 'user invalid' })
//     //     else if (!rootUser.isRoot) callback({ message: 'root user only' }, null)
//     //     else callback(null, rootUser)
//     // });

//     let rootUser = req.payload
//     let { mail, isRoot } = rootUser

//     if (!rootUser || !mail) callback({ message: 'login required' })
//     else if (!isRoot) callback({ message: 'root user only' }, null)
//     else callback(null, rootUser)
// }

//allocate monitor
//id of monitor and user that is allocated is from req.body or param
//id of rootUser is from session
module.exports.allocateMonitor = (req, res) => {

    let { uid, mid } = req.body;
    if (!uid) res.status(400).json({ message: 'user id is required' })
    if (!mid) res.status(400).json({ message: 'monitor id is required' })

    isRoot(req, (err, rootUser) => {
        if (err) res.status(401).json(err)
        else {
            // let findedUser, findedMonitor;
            let findUser = User.findById(uid, (u_err, user) => {

                // if (u_err) res.status(400).json('allocated user invalid');
                if (u_err) res.status(400).json(u_err);

                return user

            });

            let findMonitor = Monitor.findById(mid, (m_err, monitor) => {
                // if (m_err) res.status(400).json('allocated monitor invalid');
                if (m_err) res.status(400).json(m_err);

                return monitor
            });

            Promise
                .all([findUser, findMonitor])
                .then((vals) => {
                    let user = vals[0]
                    let monitor = vals[1]

                    if (!user) res.status(400).json({ message: 'no user founded' })
                    if (!monitor) res.status(400).json({ message: 'no monitor founded' })

                    user.addMonitor(mid)
                    user.save(err => {
                        console.log('from user.save')
                        console.error(err)
                        if (err) res.status(500).json({ message: 'internal error' })
                        res.status(200).json({ message: 'monify success' })
                    })
                })
                .catch(err => {
                    console.log('from user.save.catch');
                    console.log(err);
                    if (err) res.status(400).json({ message: err.toString() });
                })
        }

    })
}

//unallocate monitor
//id of monitor and user that is allocated is from req.body or param
//id of rootUser is from session
module.exports.unallocateMonitor = (req, res) => {
    let { uid, mid } = req.body;
    if (!uid) console.log('uid')
    console.log(mid)

    if (!uid) res.status(400).json({ message: 'user id is required' })
    if (!mid) res.status(400).json({ message: 'monitor id is required' })

    isRoot(req, (err, rootUser) => {
        if (err) return res.status(401).json(err);
        if (!uid) return res.status(400).json({ message: 'user id is required' });
        if (!mid) return res.status(400).json({ message: 'monitor id is required' });

        console.log(rootUser);
        if (uid === rootUser._id) return res.status(400).json({ message: 'cannot unallocate from root-user' });

        User.findById(uid, (err, user) => {
            console.log(err)
            if (err) return res.status(400).json(err)
            if (!user) return res.status(400).json({ message: 'id invalid' })

            let index = user.alMonitors.indexOf(mid)

            if (index === -1) res.status(400).json({ message: 'this user isnt even allow to use this monitor' })
            else {
                user.alMonitors.splice(index, 1);

                user.save((err) => {
                    console.log(err);
                    if (err) res.status(400).json(err)
                    else res.status(200).json({ message: 'success to unallocated monitor' })
                })
            }

        })
    })
}

//add User
//cannot know how to add user
//just now use Date.now().toString() to make id
//this will change in the future
module.exports.addUser = (req, res) => {
    isRoot(req, (err, rootUser) => {
        if (err) return res.status(401).json(err);

        let { mail, ke, password, detail } = req.body

        //pre-condition
        if (!mail) return res.status(400).json({ message: 'email required' })
        if (!ke) return res.status(400).json({ message: 'ke required' })
        if (!password) return res.status(400).json({ message: 'password required' })


        //check if the email have been already existed
        User
            .find({ mail })
            .exec((err, users) => {
                if (users.length > 0) {
                    return res.status(400).json({ message: 'email have been existed' })
                }

                let newUser = new User({
                    isRoot: false,
                    alMonitors: [],
                    mail, password, detail, ke
                })
                newUser.save(err => {
                    if (err) {
                        console.log('err from newUser.save from adminCtrl')
                        console.error(err)
                        res.status(400).json(err)
                    } else {
                        res.status(201).json({ message: 'create new user success' })
                    }
                })

            })



    })
}

module.exports.removeGroupUser = (req, res) => {

    isRoot(req, (err, rootUser) => {
        if (err) return res.status(400).json(err);

        
        const listUser = JSON.parse(req.body.listUser);
        
        // console.log('done parse');
        // console.log(listUser.length);

        if(!listUser || !listUser.length) return res.status(400).json({message: 'no user selected'});

        //check whether root-user in this

        for (let i = 0; i < listUser.length; ++i) {
            console.log(listUser[i]);
            console.log(rootUser);
            if (listUser[i] === rootUser._id) return res.status(400).json({ message: 'cannot delete root user' });
                
        }

        // console.log('donet for');

        // delete
        User.deleteMany({ _id: { $in: listUser } }, (err) => {
            if(err) return res.status(400).json(err);

            return res.status(200).json({message: 'delete completed'});
        });

    });

}

//remove user
module.exports.removeUserByMail = (req, res) => {
    isRoot(req, (err, rootUser) => {
        if (err) return res.status(401).json(err);


        let { mail } = req.body;
        if (!mail) return res.status(400).json({ message: 'mail is required' })

        //check whether mail is root or not
        if (mail === rootUser.mail) return res.status(400).json({ message: 'cannot delete root user acc' })

        // User
        //     .findOne({ mail }, (err, user) =>{
        //         if(err) if (err) return res.status(400).json(err)
        //         if(!user) return res.status(400).json({message: 'invalid mail'})
        //         user.remove
        //     })
        //     .remove((err) => {
        //         if (err) return res.status(400).json(err)
        //         else return res.status(200).json({ message: 'remove completed' })
        //     })

        User
            .findOne({ mail })
            .remove()
            .exec((err, numRemove) => {
                console.log(numRemove)
                if (err) return res.status(400).json(err)
                if (!numRemove.n) return res.status(400).json({ message: 'mail invalid' })
                return res.status(200).json({ message: 'remove completed' })
            })
    })
}

// //just now we show the id of the monitors
// module.exports.alMonitorsByMail = (req, res) => {
//     isRoot(req, (err, rootUser) => {
//         if(err) return res.status(401).json(err);

//         let mail = req.query.mail;

//         if(!mail) return res.status(400).json({message: 'mail is required'})

//         User
//             .findOne({mail}, (err, user) => {
//                 if(err) return res.status(400).json(err);
//                 if(!user) return res.status(400).json({message: 'mail is invalid'});

//                 return res.status(200).json({alMonitors: user.alMonitors})
//             })
//     })
// }

// // unalocate monitor from user by id
// module.exports.unalMonitorsByMail = (req, res) => {
//     isRoot(req, (err, rootUser) => {
//         if(err) return res.status(401).json(err);

//         let mail = req.query.mail;

//         if(!mail) return res.status(400).json({message: 'mail is required'})

//         User
//             .findOne({mail}, (err, user) => {
//                 if(err) return res.status(400).json(err);
//                 if(!user) return res.status(400).json({message: 'mail is invalid'});

//                 return res.status(200).json({alMonitors: user.alMonitors})
//             })
//     })
// }


//get all user
module.exports.getAllUser = (req, res) => {
    isRoot(req, (err, rootUser) => {

        if (err) return res.status(400).json(err);

        User.find({}, (err, users) => {
            if (err) return res.status(400).json(err);

            if (!users.length) return res.status(404).json({ message: 'no user founded' });

            return res.status(200).json({ users });
        })
    })
}

module.exports.getAllMonitor = (req, res) => {
    isRoot(req, (err, rootUser) => {
        if (err) return res.status(400).json(err);

        Monitor.find({}, (err, monitors) => {
            if (err) return res.status(400).json(err);

            if (!monitors.length) return res.status(404).json({ message: 'no monitor founded' });

            return res.status(200).json({ monitors });
        })
    })
}