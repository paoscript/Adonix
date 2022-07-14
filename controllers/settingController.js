var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");

/* GET login page. */
router.get('/', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRolUser;

    let user = await userManagement.getUserById(idUser);

    if (idUser === undefined) {
        res.redirect("/login");
        return;
    } else {
        res.render('settings', 
            { 
                title: 'Settings', 
                isWithInterface: true,
                isHasMenuUserPermition: idRolUser == 1 ? true : false, 
                user:user
            }
        );
    }
});


router.post('/', async (req, res, next) => {
    let idUser = req.cookies.idUser;
    let { identification, password, name, email} = req.body;

    if (idUser === undefined) {
        res.redirect("/login");
        return;
    } else {
        await userManagement.updateUserSettingsById(identification, password, name, email, idUser);
        res.redirect('/settings/');
    }
})

module.exports = router;