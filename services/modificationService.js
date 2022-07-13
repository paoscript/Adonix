const query = require('./dbService.js')


exports.createModification = async (typeModification, apprenticeId, dateStart, dateEnd, countDays, userCreatorId) => {
    
    await query("insert into modifications (mod_type_modification, mod_apprentice_id, mod_date_start, mod_date_end, mod_count_day, mod_creator_id) values (?, ?, ?, ?, ?, ?);", [typeModification, apprenticeId, dateStart, dateEnd, countDays, userCreatorId]);

    return;
}

exports.getModificationsList = async () => {
    let rows = []
    
    rows = await query("select m.mod_id, m.mod_type_modification, m.mod_apprentice_id, m.mod_date_start, m.mod_date_end, m.mod_count_day from modifications as m");

    return rows;

}


exports.getModificationById = async (modificationId) => {
    
    let rows = await query("select m.mod_id, m.mod_type_modification, m.mod_apprentice_id, m.mod_date_start, m.mod_date_end, m.mod_count_day from modifications as m where m.mod_id = ?", [modificationId]);

    if (rows.length === 0) {
        return "";
    }

    let modification = rows[0];

    return modification;
}

exports.deleteModificationById = async (modificationId) => {
    
    await query("DELETE FROM modifications as m WHERE m.mod_id = ?",[modificationId]);

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