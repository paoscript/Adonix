const query = require('./dbService.js')


exports.createModification = async (typeModification, apprenticeId, dateStart, dateEnd, countDays, userCreatorId) => {
    
    await query("insert into modifications (mod_type_modification, mod_apprentice_id, mod_date_start, mod_date_end, mod_count_day, mod_creator_id) values (?, ?, ?, ?, ?, ?);", [typeModification, apprenticeId, dateStart, dateEnd, countDays, userCreatorId]);

    return;
}

exports.getModificationsList = async () => {
    let rows = []
    
    rows = await query("select m.mod_id, m.mod_type_modification, a.app_identification, m.mod_date_start, m.mod_date_end, m.mod_count_day from modifications as m inner join apprentices as a on m.mod_apprentice_id = a.app_id");

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

exports.updateModificationById = async (typeModification, dateStart, dateEnd, countDays, apprenticeId, modificationId) => {
    
    await query("UPDATE modifications as m SET m.mod_type_modification=?, m.mod_date_start=?, m.mod_date_end=?, m.mod_count_day=?, m.mod_apprentice_id=? WHERE m.mod_id=?", [typeModification, dateStart, dateEnd, countDays, apprenticeId, modificationId]);

    return;
}