const expressJWT = require('express-jwt')
const authMid = expressJWT({
    userProperty: 'payload', //decode userproperty in jwt-structure and pass to req.payload
    secret: process.env.JWT_SECRET
})

module.exports = authMid;