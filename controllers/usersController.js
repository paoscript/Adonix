var express = require('express');
var router = express.Router();
const userManagement = require("../services/userManager");
const generatorReportService = require("../services/generatorReportService");
const fs = require('fs')
const path = require('path')

var roleList = ["Administrator", "Manager", "Employee"];

/* GET create user page. */
router.get('/create', function(req, res, next) {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('users_create', 
            { 
                title: 'Create New User', 
                isWithInterface: true,
                isHasMenuUserPermition: idRolUser == 1 ? true : false,   
                roleList: roleList
            }
        );
    }
});

/* GET consult users page. */
router.get('/consult', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    let listUsers = await userManagement.getUserList();

    let pagination = []

    if (listUsers.length > 0) {
        let cantidad = Math.ceil(listUsers.length / 10)

        for (let index = 0; index < cantidad; index++) {
            pagination.push({number: index + 1})            
        }
    }

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('users_consult', 
            { 
                title: 'Consult Users', 
                isWithInterface: true,
                isHasMenuUserPermition: idRolUser == 1 ? true : false,
                hasDowloadRecordPermition: idRolUser == 1 || idRolUser == 2 ? true : false,
                countRecords: listUsers.length, 
                listUsers: listUsers, 
                pagination: pagination
            }
        );
    }
});




/* GET create user page. */
router.get('/edit/:userId', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;
    const userId = req.params.userId;
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
    
    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('users_edit', 
            { 
                title: 'Edit User', 
                isWithInterface: true,
                isHasMenuUserPermition: idRolUser == 1 ? true : false,  
                user: user, 
                roleList: roleListResult
            }
        );
    }
});

/* GET create user page. */
router.post('/create/newUser', async function(req, res, next) {
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

/* GET create user page. */
router.post('/delete/:userId', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    const userId = req.params.userId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    if (userId == 1 || userId == 2 || userId == 8) {
        res.redirect('/users/consult/')
        return;
    } else {
        await userManagement.deleteUserById(userId)
    }
    res.redirect('/users/consult/')

});

/* GET create user page. */
router.post('/update/:userId', async function(req, res, next) {
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

router.get('/dowload', async (req, res, next) => {
    let idUser = req.cookies.idUser;
    await generatorReportService.generateUsersReport(idUser);

    let file = fs.readFileSync(path.join(__dirname, `../public/reports/${idUser}/users.xlsx`), 'binary');

    res.setHeader('Content-Length', file.length);
    res.setHeader('Content-disposition', 'attachment; filename=users.xlsx');
    res.write(file, 'binary')

    res.end();
});

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