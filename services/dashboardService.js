const query = require('./dbService.js')

exports.getCountApprentices = async () => {
    let rows = []
    
    rows = await query("SELECT count(*) as count FROM apprentices;");

    return rows[0];

}

exports.getCountLastestApprenticeship = async () => {
    let rows = []
    
    rows = await query("SELECT count(a.app_productive_start_date) as count from apprentices AS a WHERE a.app_productive_start_date BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND NOW()");

    return rows[0];

}

exports.getCountApprendicesNearingLeave = async () => {
    let rows = []
    
    rows = await query("SELECT count(a.app_productive_end_date) as count from apprentices AS a WHERE a.app_productive_end_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 60 DAY)");

    return rows[0];

}

exports.getCountModifications = async () => {
    let rows = []
    
    rows = await query("SELECT count(*) as count FROM modifications;");

    return rows[0];

}