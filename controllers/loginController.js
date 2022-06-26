var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");

/* GET login page. */
router.get('/', function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.render('login', {title: 'Welcome to Adonix! 🤩 🚀', isWithInterface: false});
    } else {
        res.redirect('/');
    }
});

router.post('/', async (req, res, next) => {
    let idUser =  1//req.cookies.idUser;
    let { numberIdentification, password} = req.body;

    let isUserCorrect = await userManagement.validateLogin(numberIdentification, password);

    if (isUserCorrect) {
        res.cookie('idUser', idUser)
        res.redirect('/')
    } else {
        res.redirect('/');
    }
})

module.exports = router;