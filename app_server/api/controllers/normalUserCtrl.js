const User = require('../models/User');
const Monitor = require('../models/Monitor');
const request = require('request');

//just now we use to send all the monitorid
//but in the future we have to find in Monitor to use some kind of data in it

module.exports.listAllMonitor = (req, res) => {
    let mail = req.payload.mail;
    // if (!mail) res.status(400).json({ message: 'mail is required' })

    User
        .findOne({ mail }, (err, user) => {
            let { alMonitors } = user

            if (err) res.status(500).json({ message: 'Internal error' });
            else if (!alMonitors) res.status(404).json({ message: 'no monitors allow' });
            else res.status(200).json({ alMonitors });
        })

}

module.exports.listAllStreamByMail = (req, res) => {
    let mail = req.payload.mail;
    // if (!mail) res.status(400).json({ message: 'mail is required' })

    User
        .findOne({ mail }, (err, user) => {
            let { alMonitors } = user
            const { DOMAIN, API_KEY, GROUP_KEY } = process.env;
            let returnJson = alMonitors.map(mid => {
                return {
                    mid,
                    link: `${DOMAIN}/${API_KEY}/embed/${GROUP_KEY}/${mid}/jquery|fullscreen`
                }
            })

            if (err) res.status(500).json({ message: 'Internal error' });
            else if (!alMonitors) res.status(404).json({ message: 'no monitors allow' });
            else res.status(200).json({ data: returnJson });
        })

}

module.exports.getMonitorById = (req, res) => {
    let { mid } = req.query;
    let { mail } = req.payload;

    if (!mid) return res.status(400).json({ message: 'id is required' })

    //decide whether id is required by user or not
    User
        .findOne({ mail })
        .exec((err, user) => {

            let { alMonitors } = user;
            if (err) return res.status(400).json(err);
            if (!alMonitors.includes(mid))
                return res.status(400).json({ message: 'user is not allowed to use this monitor or mid not exist' });

            Monitor
                .findById(mid, (err, monitor) => {
                    if (err) res.json(err).status(400);
                    else if (!monitor) res.status(400).json({ message: 'no monitor founded' });
                    else res.status(200).json({ monitor });
                })
        })
}

//video
module.exports.getVideoOfAMonitor = (req, res) => {
    const { mid } = req.query;
    const { mail } = req.payload;

    if (!mid) return res.json({ message: "mid is required" });

    //decide whether the moniter is allow for user or not
    User
        .findOne({ mail })
        .exec((err, user) => {

            if (err) return res.json(err).status(400);

            if (!user.alMonitors.includes(mid))
                return res.json({ message: 'user is not allow to use that monitor' });

            const { DOMAIN, API_KEY, GROUP_KEY } = process.env;
            const uri = `${DOMAIN}/${API_KEY}/videos/${GROUP_KEY}/${mid}`;

            request(uri, (err, resp) => {

                if (err) return res.json(err).status(400);

                //parse json
                //get videos attr from json
                //map
                let videos = JSON
                    .parse(resp.body)
                    .videos
                    .map(v => {
                        return {
                            ...v,
                            href: DOMAIN + v.href
                        }
                    })


                res.status(200).json({ videos })


            })

        })
}


//get setting 
module.exports.getSetting = (req, res) => {
    const { mail } = req.payload;

    User
        .findOne({ mail }, (err, user) => {
            if (err) return res.status(400).json(err);
            else if (!user) return res.status(400).json({message: 'no user founded'});
            else return res.status(200).json({options: user.options});
        })
}

//setting the page
module.exports.settingPage = (req, res) => {
    const { changeMail,
        changePassword,
        videoPerPage,
        monitorPerPage,
        videoPerRow,
        monitorPerRow,
        monitorFilter,
        videoFilter } = req.body;

    const { mail } = req.payload;

    if (!changeMail &&
        !changePassword &&
        !videoPerPage &&
        !monitorPerPage &&
        !videoPerRow &&
        !monitorPerRow &&
        !monitorFilter &&
        !videoFilter) return res.status(400).json({ message: "at least one option should fill" })

    User.findOne({ mail }, (err, user) => {
        if (changePassword) {
            user.changePassword(changePassword);
        }

        if(changeMail) user.mail = changeMail; //adding change mail
        if(!user) return res.status(400).json({message: 'mail had changed'});

        //obsolate
        // user.options = {
        //     videoPerPage,
        //     monitorPerPage,
        //     videoPerRow,
        //     monitorPerRow,
        //     monitorFilter,
        //     videoFilter
        // }

        if (videoPerPage) user.options.videoPerPage = videoPerPage;
        if (monitorPerPage) user.options.monitorPerPage = monitorPerPage;
        if (videoPerRow) user.options.videoPerRow = videoPerRow;
        if (monitorPerRow) user.options.monitorPerRow = monitorPerRow;
        if (monitorFilter) user.options.monitorFilter = monitorFilter;
        if (videoFilter) user.options.videoFilter = videoFilter;

        user.save(err => {
            if (err) res.status(400).json(err);
            else res.status(200).json({
                setting: user.options
            });
        })
    })
}