const route = require('express').Router();
const authMid = require('../middlewares/authentication');
const apiRoute = require('../api/routes/route');

route.get('/', (req, res) => {
    res.render('../views/index.ejs');
});

route.get('/admin', authMid, (req, res) => {
    res.render('../views/admin.ejs');
})

route.use('/api', apiRoute);

module.exports = route;