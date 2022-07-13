var express = require('express');
var router = express.Router();
const modificationService = require("../services/modificationService");
const apprenticesService = require("../services/apprenticesService")

/* GET create user page. */
router.get('/create', function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('modifications_create', { title: 'Create New Modification', isWithInterface: true });
    }
});

/* GET consult users page. */
router.get('/consult', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    let listModifications = await modificationService.getModificationsList();

    let pagination = []

    if (listModifications.length > 0) {
        let cantidad = Math.ceil(listModifications.length / 10)

        for (let index = 0; index < cantidad; index++) {
            pagination.push({number: index + 1})            
        }
    }

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('modifications_consult', { title: 'Consult Modifications', isWithInterface: true, countRecords: listModifications.length, listModifications: listModifications, pagination: pagination});
    }
});




/* GET create user page. */
router.get('/edit/:modificationId', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    const modificationId = req.params.modificationId;
    let modification = await modificationService.getModificationById(modificationId);   

    if(modification === "") {
        res.redirect('/users/edit/errors/error-404.html');
        return;
    }

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('modifications_edit', { title: 'Edit User', isWithInterface: true, modification: modification});
    }
});

/* GET create user page. */
router.post('/create/newModification', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let {typeModification, documentId, dateStart, dateEnd, countDays} = req.body;

    let apprentice = await apprenticesService.getApprenticeByNumberIdentification(documentId);

    console.log(apprentice);

    await modificationService.createModification(typeModification, apprentice[0].app_id, dateStart, dateEnd, countDays, idUser);
    
    res.redirect('/modifications/consult/')

});

/* GET create user page. */
router.post('/delete/:modificationId', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    const modificationId = req.params.modificationId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }


    await modificationService.deleteModificationById(modificationId)

    res.redirect('/modifications/consult/')

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

    await userManagement.modificationService(numberIdentification, userName, email, userId);

    res.redirect('/modifications/consult/')
});

module.exports = router;