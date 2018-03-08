let {Router} = require('express')
let router = Router();
let mainCtrl = require('../controller/main')
let loginCtrl = require('../controller/login');

router.get('/', mainCtrl);
router.get('/login', loginCtrl);

module.exports = router