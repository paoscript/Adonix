var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");

/* GET settings page. */
router.get('/', async (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRolUser;

    if (idUser === undefined) {
        res.redirect("/login");
        return;
    }

    let user = await userManagement.getUserById(idUser);

    res.render('settings', 
        { 
            title: 'Settings', 
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false, 
            user: user
        }
    );

});

/*POST update setting for requesting user. */
router.post('/', async (req, res) => {
    let idUser = req.cookies.idUser;
    let { identification, password, name, email} = req.body;

    if (idUser === undefined) {
        res.redirect("/login");
        return;
    } 

    await userManagement.updateUserSettingsById(identification, password, name, email, idUser);

    res.redirect('/settings/');
})

module.exports = router;