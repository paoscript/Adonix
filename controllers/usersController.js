var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");
const generatorReportService = require("../services/generatorReportService");
const fs = require('fs')
const path = require('path')

var roleList = ["Administrator", "Manager", "Employee"];

/* GET create user page. */
router.get('/create', (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }
    
    res.render('users_create', 
        { 
            title: 'Create New User', 
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false,   
            roleList: roleList
        }
    );

});

/* GET consult user page. */
router.get('/consult', async (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    if (idUser === undefined) {
        res.redirect('/login');
    }

    let listUsers = await userManagement.getUserList();

    res.render('users_consult', 
        { 
            title: 'Consult Users', 
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false,
            hasDowloadRecordPermition: idRolUser == 1 || idRolUser == 2 ? true : false,
            countRecords: listUsers.length, 
            listUsers: listUsers, 
        }
    );
});




/* GET edit user by id page. */
router.get('/edit/:userId', async (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;
    let userId = req.params.userId;

    if (idUser === undefined) {
        res.redirect('/login');
    }

    let user = await userManagement.getUserById(userId);
    
    if(user === "") {
        res.redirect('/users/edit/errors/error-404.html');
        return;
    }

    let roleName = "";
    let rolId = user.use_rol_id

    if(rolId == 1) {
        roleName = "Administrator";
    } else if(rolId == 2){
        roleName = "Manager";
    } else if (rolId == 3) {
        roleName = "Employee";
    }

    let roleListResult = orderOptions(roleName, roleList);
    
    res.render('users_edit', 
        { 
            title: 'Edit User', 
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false,  
            user: user, 
            roleList: roleListResult
        }
    );

});

/* POST create new user. */
router.post('/create/newUser', async (req, res) => {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let rolId = req.body.rolId;

    if (rolId === "Administrator") {
        rolId = 1;
    } else if (rolId === "Manager") {
        rolId = 2
    } else if (rolId === "Employee") {
        rolId = 3;
    }

    let numberIdentification = req.body.identification;
    let password = req.body.password;
    let userName = req.body.name;
    let email = req.body.email;

    await userManagement.createUser(numberIdentification, userName, password, email, rolId);

    res.redirect('/users/consult/')

});

/* POST delete user by id. */
router.post('/delete/:userId', async (req, res) => {
    let idUser = req.cookies.idUser;
    let userId = req.params.userId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    if (userId == 1 || userId == 2 || userId == 3) {
        res.redirect('/users/consult/')
        return;
    } 

    await userManagement.deleteUserById(userId)
    
    res.redirect('/users/consult/')

});

/* POST update user by id. */
router.post('/update/:userId', async (req, res) => {
    let idUser = req.cookies.idUser;
    const userId = req.params.userId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let numberIdentification = req.body.identification;
    let userName = req.body.name;
    let email = req.body.email;

    await userManagement.updateUserById(numberIdentification, userName, email, userId);

    res.redirect('/users/consult/')
});

/*GET dowload report of all users. */
router.get('/dowload', async (req, res) => {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    }

    await generatorReportService.generateUsersReport(idUser);

    let file = fs.readFileSync(path.join(__dirname, `../public/reports/${idUser}/users.xlsx`), 'binary');

    res.setHeader('Content-Length', file.length);
    res.setHeader('Content-disposition', 'attachment; filename=users.xlsx');
    res.write(file, 'binary')

    res.end();
});

/*FUCTIONS UTILS */

/*Sorts the list of options and places the first parameter as the first option*/
function orderOptions(first, listOptions) {
    list = [first]

    listOptions.forEach(element => {
        if (element != first) {
            list.push(element)
        }
    });

    return list;
}

module.exports = router;