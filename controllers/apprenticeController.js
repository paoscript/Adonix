var express = require('express');
var router = express.Router();
const apprenticesService = require("../services/apprenticesService");

var svgaOptions = ["Yes", "No", "Pending"];
var yieldedOptions = ["Yes", "No", "Studing"];
var categoryOptions = ["Technical", "Technologist", "Professional"];
var stateOptions = ["Lective", "Productive", "University"];
var listCity = ["Amazonas","Antioquia","Arauca","Atlántico","Bogotá","Bolívar","Boyacá","Caldas","Caquetá","Casanare","Cauca","Cesar","Chocó","Córdoba","Cundinamarca","Guainía","Guaviare","Huila","La Guajira","Magdalena","Meta","Nariño","Norte de Santander","Putumayo","Quindío","Risaralda","San Andrés y Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupés","Vichada"]


/* GET main page. */
router.get('/create', function (req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('apprentices_create',
            {
                title: 'Create New Apprentice',
                isWithInterface: true,
                svgaOptions: svgaOptions,
                yieldedOptions: yieldedOptions,
                categoryOptions: categoryOptions,
                stateOptions: stateOptions,
                listCity: listCity
            }
        );
    }
});

/* GET main page. */
router.get('/consult', async function (req, res, next) {
    let idUser = req.cookies.idUser;

    let listApprentices = await apprenticesService.getApprenticesList();

    let pagination = []

    if (listApprentices.length > 0) {
        let cantidad = Math.ceil(listApprentices.length / 10)

        for (let index = 0; index < cantidad; index++) {
            pagination.push({ number: index + 1 })
        }
    }

    if (idUser === undefined) {
        res.redirect('/login');
    } else {
        res.render('apprentices_consult',
            {
                title: 'Consult Apprentices',
                isWithInterface: true,
                listApprentices: listApprentices,
                pagination: pagination,
                countRecords: listApprentices.length
            }
        );
    }
});


/* GET create user page. */
router.post('/create/newApprentice', async function (req, res, next) {
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
router.post('/delete/:apprenticeId', async function (req, res, next) {
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
router.get('/edit/:apprenticeId', async function (req, res, next) {
    let idUser = req.cookies.idUser;

    if (idUser === undefined) {
        res.redirect('/login');
        return;
    }

    const apprenticeId = req.params.apprenticeId;
    let apprentice = await apprenticesService.getApprenticeById(apprenticeId);

    if (apprentice === undefined) {
        res.redirect('/users/edit/errors/error-404.html');
        return;
    }

    var svgaOptionsResult = orderOptions(apprentice.app_sgva, stateOptions);
    var yieldedOptionsResult = orderOptions(apprentice.app_yielded, yieldedOptions);
    var categoryOptionsResult = orderOptions(apprentice.app_category, categoryOptions);
    var stateOptionsResult = orderOptions(apprentice.app_state, stateOptions);
    var listCityResult = orderOptions(apprentice.app_city, listCity)

    res.render('apprentices_edit',
        {
            title: 'Update User',
            isWithInterface: true,
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

/* GET create user page. */
router.post('/update/:apprenticeId', async function (req, res, next) {
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