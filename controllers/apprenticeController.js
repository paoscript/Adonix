var express = require('express');
var router = express.Router();
const apprenticesService = require("../services/apprenticesService");
const generatorReportService = require("../services/generatorReportService");
const fs = require('fs')
const path = require('path')

var svgaOptions = ["Yes", "No", "Pending"];
var yieldedOptions = ["Yes", "No", "Studing"];
var categoryOptions = ["Technical", "Technologist", "Professional"];
var stateOptions = ["Lective", "Productive", "University"];
var listCity = ["Amazonas","Antioquia","Arauca","Atlántico","Bogotá","Bolívar","Boyacá","Caldas","Caquetá",
                "Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila",
                "La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda",
                "San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada"];

/* GET create apprentice page. */
router.get('/create', (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    } 

    res.render('apprentices_create',
        {
            title: 'Create New Apprentice',
            isHasMenuUserPermition: idRolUser == 1 ? true : false,
            isWithInterface: true,
            svgaOptions: svgaOptions,
            yieldedOptions: yieldedOptions,
            categoryOptions: categoryOptions,
            stateOptions: stateOptions,
            listCity: listCity
        }
    );
});

/* GET consult apprentice page. */
router.get('/consult', async (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    } 

    let listApprentices = await apprenticesService.getApprenticesList();
    listApprentices = ajustDateForListApprentices(listApprentices);

    res.render('apprentices_consult',
        {
            title: 'Consult Apprentices',
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false,
            hasDowloadRecordPermition: idRolUser == 1 || idRolUser == 2 ? true : false,
            listApprentices: listApprentices,
            countRecords: listApprentices.length
        }
    );
});


/* POST create new apprentice. */
router.post('/create/newApprentice', async (req, res) => {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let { identification, idCCMS, name, group, sgva, ceco, jobDescription, relatedPosition, payment, birthDay, address, email, eps, city,
        institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, company, endDateStudy, productiveStartDate,
        productiveEndDate, countDays, phoneNumber } = req.body;

    await apprenticesService.createNewApprentice(identification, name, idCCMS, sgva, group, ceco, jobDescription, relatedPosition, 
                                                    payment, birthDay, address, email, eps, city, institution, specility, nameBoss, 
                                                    ccmsBoss, category, yielded, state, contratStartDate, endDateStudy, productiveStartDate, 
                                                    productiveEndDate, countDays, phoneNumber, company, idUser);

    res.redirect('/apprentices/consult/');
});


/* POST delete apprentice by id. */
router.post('/delete/:apprenticeId', async (req, res) => {
    let idUser = req.cookies.idUser;
    let apprenticeId = req.params.apprenticeId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    await apprenticesService.deleteApprenticeById(apprenticeId)

    res.redirect('/apprentices/consult/')
});

/* GET edit apprentice by id. */
router.get('/edit/:apprenticeId', async (req, res) => {
    let idUser = req.cookies.idUser;
    let idRolUser = req.cookies.idRole;
    let apprenticeId = req.params.apprenticeId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let apprentice = await apprenticesService.getApprenticeById(apprenticeId);

    if (apprentice === undefined) {
        res.redirect('/users/edit/errors/error-404.html');
        return;
    }

    let svgaOptionsResult = orderOptions(apprentice.app_sgva, stateOptions);
    let yieldedOptionsResult = orderOptions(apprentice.app_yielded, yieldedOptions);
    let categoryOptionsResult = orderOptions(apprentice.app_category, categoryOptions);
    let stateOptionsResult = orderOptions(apprentice.app_state, stateOptions);
    let listCityResult = orderOptions(apprentice.app_city, listCity)

    res.render('apprentices_edit',
        {
            title: 'Update User',
            isWithInterface: true,
            isHasMenuUserPermition: idRolUser == 1 ? true : false,
            apprentice: apprentice,
            contratStartDate: parseToDate(apprentice.app_contract_start_date),
            endDateStudy: parseToDate(apprentice.app_end_date_study),
            productiveStartDate: parseToDate(apprentice.app_productive_start_date),
            productiveEndDate: parseToDate(apprentice.app_productive_end_date),
            birthday: parseToDate(apprentice.app_birthday),
            svgaOptions: svgaOptionsResult,
            yieldedOptions: yieldedOptionsResult,
            categoryOptions: categoryOptionsResult,
            stateOptions: stateOptionsResult,
            listCity: listCityResult
        }
    );
});

/* POST update apprentice by id. */
router.post('/update/:apprenticeId', async (req, res) => {
    let idUser = req.cookies.idUser;
    const apprenticeId = req.params.apprenticeId;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    let { identification, idCCMS, name, group, sgva, ceco, jobDescription, relatedPosition, payment, birthday, address, email, eps, city,
        institution, specility, nameBoss, ccmsBoss, category, yielded, state, contratStartDate, company, endDateStudy, productiveStartDate,
        productiveEndDate, countDays, phoneNumber } = req.body;

    await apprenticesService.updateApprenticeById(identification, name, idCCMS, sgva, group, ceco, jobDescription, relatedPosition, payment, 
                                                    birthday, address, email, eps, city, institution, specility, nameBoss, ccmsBoss, category, 
                                                    yielded, state, contratStartDate, endDateStudy, productiveStartDate, productiveEndDate, 
                                                    countDays, phoneNumber, company, apprenticeId);

    res.redirect('/apprentices/consult/');
});

/* Get dowload report of all apprentices. */
router.get('/dowload', async (req, res) => {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    await generatorReportService.generateApprenticesReport(idUser);

    let file = fs.readFileSync(path.join(__dirname, `../public/reports/${idUser}/apprentices.xlsx`), 'binary');

    res.setHeader('Content-Length', file.length);
    res.setHeader('Content-disposition', 'attachment; filename=apprentices.xlsx');
    res.write(file, 'binary')

    res.end();
});

/* FUCTIONS UTILS */

/* Return a list of aprentices with date parsed */
function ajustDateForListApprentices(listApprentices) {
    
    listApprentices.forEach(apprentice => {
        apprentice.app_productive_start_date = parseToDate(apprentice.app_productive_start_date)
        apprentice.app_productive_end_date = parseToDate(apprentice.app_productive_end_date)
    });

    return listApprentices;

}

/* Return date parsed */
function parseToDate(date) {

    if (date === null) {
        return "";
    }

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    let dateParsed = year + "-" + month + "-" + day;

    return dateParsed
}


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