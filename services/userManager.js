const query = require('./dbService.js')

exports.validateLogin = async (numberIdentification, password) => {
    let rows = await query("select u.use_identification_number, u.use_password from users as u where u.use_identification_number = ?", [numberIdentification]);

    if (rows.length === 0) {
        return false
    }

    let user = rows[0];

    return user.use_identification_number === numberIdentification && user.use_password === password;

}

exports.getUserList = async () => {
    let rows = []
    
    rows = await query("select u.use_id, u.use_identification_number, u.use_name, u.use_email, u.use_rol_id from users as u ");

    return rows;

}


exports.getUserById = async (userId) => {
    
    let rows = await query("select u.use_id, u.use_identification_number, u.use_name, u.use_email, u.use_rol_id from users as u where u.use_id = ?", [userId]);

    if (rows.length === 0) {
        return "";
    }

    let user = rows[0];

    return user;
}

exports.createUser = async (numberIdentification, userName, password, email, rolId) => {
    
    await query("INSERT INTO users (use_identification_number, use_name, use_password, use_email, use_rol_id) VALUES (?, ?, ?, ?, ?)", [numberIdentification, userName, password, email, rolId]);

    return;
}

exports.deleteUserById = async (userId) => {
    
    await query("DELETE FROM users as u WHERE u.use_id = ?",[userId]);

    return;
}

exports.updateUserById = async (userIdentification, userName, userEmail, userId) => {
    
    await query("UPDATE users as u SET u.use_identification_number=?, u.use_name=?, u.use_email=? WHERE u.use_id=?",[userIdentification, userName, userEmail, userId]);

    return;
}

exports.updateUserSettingsById = async (userIdentification, password, name,userEmail, userId) => {
    
    await query("UPDATE users as u SET u.use_identification_number=?, u.use_password=?,u.use_name=?, u.use_email=? WHERE u.use_id=?",[userIdentification, password, name, userEmail, userId]);

    return;
}