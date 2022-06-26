var express = require('express');
var router = express.Router();
const apprenticesService = require("../services/apprenticesService");


/* GET main page. */
router.get('/create', function(req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('apprentices_create', { title: 'Create New Apprentice', isWithInterface: true });
    }
});

/* GET main page. */
router.get('/consult', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    let listApprentices = await apprenticesService.getApprenticesList();

    let pagination = []

    if (listApprentices.length > 0) {
        let cantidad = Math.ceil(listApprentices.length / 10)

        for (let index = 0; index < cantidad; index++) {
            pagination.push({number: index + 1})            
        }
    }

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('apprentices_consult', { title: 'Consult Apprentices', isWithInterface: true, listApprentices: listApprentices, pagination: pagination, countRecords: listApprentices.length });
    }
});


/* GET create user page. */
router.post('/create/newApprentice', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    console.log(idUser)

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    console.log(req.body);

    let { identification, idCCMS, name, group, sgva, ceco, jobDescription, relatedPosition, payment, birthday, address, email, eps, city,
        institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, company, endDateStudy, productiveStartDate,
        productiveEndDate, countDays, phoneNumber } = req.body;

    await apprenticesService.createNewApprentice(identification, name, idCCMS, sgva, group, ceco, jobDescription, relatedPosition, payment, birthday, address,
        email, eps, city, institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, endDateStudy, productiveStartDate, productiveEndDate, countDays, phoneNumber, company, idUser);

    res.redirect('/apprentices/consult/')

});


/* GET create user page. */
router.post('/delete/:apprenticeId', async function(req, res, next) {
    let idUser = req.cookies.idUser;

    const apprenticeId = req.params.apprenticeId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    
    await apprenticesService.deleteApprenticeById(apprenticeId)

    res.redirect('/apprentices/consult/')

});

/* GET create user page. */
router.get('/edit/:apprenticeId', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    const apprenticeId = req.params.apprenticeId;
    let apprentice = await apprenticesService.getApprenticeById(apprenticeId);
    let svga = "";

    switch (apprentice.app_sgva) {
        case 1:
            svga = "Yes";
            break;
        case 1:
            svga = "No"
            break;
        case 1:
            svga = "Pendig"
            break;
    }

    console.log(apprentice)
    
    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('apprentices_edit', { title: 'Update User', isWithInterface: true, apprentice: apprentice, svga: svga, contratStartDate: parseToDate(apprentice.app_contract_start_date), endDateStudy: parseToDate(apprentice.app_end_date_study), productiveStartDate: parseToDate(apprentice.app_productive_start_date), productiveEndDate: parseToDate(apprentice.app_productive_end_date), birthday: parseToDate(apprentice.app_birthday) });
    }
});

/* GET create user page. */
router.post('/update/:apprenticeId', async function(req, res, next) {
    let idUser = req.cookies.idUser;
    const apprenticeId = req.params.apprenticeId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let { identification, idCCMS, name, group, sgva, ceco, jobDescription, relatedPosition, payment, birthday, address, email, eps, city,
        institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, company, endDateStudy, productiveStartDate,
        productiveEndDate, countDays, phoneNumber } = req.body;

    await apprenticesService.updateApprenticeById(identification, name, idCCMS, sgva, group, ceco, jobDescription, relatedPosition, payment, birthday, address,
        email, eps, city, institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, endDateStudy, productiveStartDate, productiveEndDate, countDays, phoneNumber, company, apprenticeId);

    res.redirect('/apprentices/consult/')
});

function parseToDate(date) {

    console.log(date);

    if (date === null) {
        return "";
    }
    let fecha = date
    let año = fecha.getFullYear()
    let mes = fecha.getMonth() + 1
    let dia = fecha.getDate()

    if (dia < 10) {
        dia = `0${dia}`;
    }

    if (mes < 10) {
        mes = `0${mes}`;
    }

    let fechaParseada = año + "-" + mes + "-" + dia;
    console.log(fechaParseada)
    return fechaParseada
}

module.exports = router;