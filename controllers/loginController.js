var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");

/* GET login page. */
router.get('/', function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.render('login', 
            {
                title: 'Welcome to Adonix! 🤩 🚀', 
                isWithInterface: false
            }
        );
        return;
    }

    res.redirect('/');

});

router.post('/', async (req, res, next) => {
    
    let { numberIdentification, password} = req.body;

    let infoLogin = await userManagement.validateLogin(numberIdentification, password);

    if (!infoLogin.isLogin) {
        res.redirect('/');
        return;
    } 

    res.cookie('idUser', infoLogin.idUser);
    res.cookie('idRole', infoLogin.rolId);
    res.redirect('/');

})

module.exports = router;