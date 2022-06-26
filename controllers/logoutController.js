var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
    res.clearCookie('idUser')
    res.render('logout', { title: 'Sesion Cerrada', isWithInterface: false});
});

module.exports = router;