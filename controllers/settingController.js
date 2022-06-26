var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");

/* GET login page. */
router.get('/', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    let user = await userManagement.getUserById(idUser);

    if (idUser === undefined) {
        res.render('login', {title: 'Welcome to Adonix! 🤩 🚀', isWithInterface: false});
    } else {
        res.render('settings', { title: 'Settings', isWithInterface: true, user:user});
    }
});


router.post('/', async (req, res, next) => {
    let idUser = req.cookies.idUser;
    let { identification, password, name, email} = req.body;

    if (idUser === undefined) {
        res.render('login', {title: 'Welcome to Adonix! 🤩 🚀', isWithInterface: false});
    } else {
        await userManagement.updateUserSettingsById(identification, password, name, email, idUser);
        res.redirect('/settings/');
    }
})

module.exports = router;