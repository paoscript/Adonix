var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('main', { title: 'Main Page', isWithInterface: true });
    }
});

module.exports = router;