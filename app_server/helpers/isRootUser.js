const User = require('../api/models/User');
const Monitor = require('../api/models/Monitor');
const isRoot = (req, callback) => {

    // console.log(req.payload)
    // console.log('inside is root')
    // let id = 'lfkasjd'
    // if (!id) callback({ message: 'login required' })
    // else User.findById(id, (err, rootUser) => {
    //     if (err) callback(err)
    //     if (!rootUser) callback({ message: 'user invalid' })
    //     else if (!rootUser.isRoot) callback({ message: 'root user only' }, null)
    //     else callback(null, rootUser)
    // });

    let rootUser = req.payload
    let { mail, isRoot } = rootUser

    if (!rootUser || !mail) callback({ message: 'login required' })
    else if (!isRoot) callback({ message: 'root user only' }, null)
    else callback(null, rootUser)
}

module.exports = isRoot;