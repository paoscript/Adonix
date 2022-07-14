const XLSX = require('xlsx');
const apprenticesService = require('./apprenticesService');
const modificationsService = require('./modificationService');
const userService = require('./userManager');
var path = require('path');
const  fs = require('fs');


exports.generateApprenticesReport = async (idUser) => {
    let apprenticesList = await apprenticesService.getApprenticesList();

    let data = XLSX.utils.json_to_sheet(apprenticesList);
    const workbook = XLSX.utils.book_new();
    const filename = 'apprentices';
    XLSX.utils.book_append_sheet(workbook, data, filename);

    let pathFileFolder = path.join(__dirname, `../public/reports/${idUser}/`);

    let existsPaht = fs.existsSync(pathFileFolder)


    if (!existsPaht) {
        fs.mkdirSync(pathFileFolder);
    }  

    let pathFile = `${pathFileFolder}${filename}.xlsx`;

    
    await XLSX.writeFile(workbook, pathFile);
    
}


exports.generateModificationsReport = async (idUser) => {
    let apprenticesList = await modificationsService.getModificationsList();

    let data = XLSX.utils.json_to_sheet(apprenticesList);
    const workbook = XLSX.utils.book_new();
    const filename = 'modifications';
    XLSX.utils.book_append_sheet(workbook, data, filename);

    let pathFileFolder = path.join(__dirname, `../public/reports/${idUser}/`);

    let existsPaht = fs.existsSync(pathFileFolder)


    if (!existsPaht) {
        fs.mkdirSync(pathFileFolder);
    }  

    let pathFile = `${pathFileFolder}${filename}.xlsx`;

    
    await XLSX.writeFile(workbook, pathFile);
    
}


exports.generateUsersReport = async (idUser) => {
    let apprenticesList = await userService.getUserList();

    let data = XLSX.utils.json_to_sheet(apprenticesList);
    const workbook = XLSX.utils.book_new();
    const filename = 'users';
    XLSX.utils.book_append_sheet(workbook, data, filename);

    let pathFileFolder = path.join(__dirname, `../public/reports/${idUser}/`);

    let existsPaht = fs.existsSync(pathFileFolder)


    if (!existsPaht) {
        fs.mkdirSync(pathFileFolder);
    }  

    let pathFile = `${pathFileFolder}${filename}.xlsx`;

    
    await XLSX.writeFile(workbook, pathFile);
    
}
