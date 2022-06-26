const query = require('./dbService.js')

exports.getApprenticesList = async () => {
    let rows = []
    
    rows = await query("select a.app_id, a.app_identification, a.app_name, a.app_ccms_id, a.app_ceco_id, a.app_email, a.app_name_boss, a.app_id_ccms_boss, a.app_contract_start_date, a.app_end_date_study, a.app_productive_start_date, a.app_productive_end_date, a.app_count_days, a.app_phone_number from apprentices as a ");

    return rows;

}

exports.createNewApprentice = async (app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, app_creator_id) => {
    let rows = []
    
    rows = await query("INSERT INTO apprentices (app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, app_creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, app_creator_id]);

    return rows;

}

exports.deleteApprenticeById = async (apprenticeId) => {
    
    await query("DELETE FROM apprentices as a WHERE a.app_id = ?",[apprenticeId]);

    return;
}


exports.getApprenticeById = async (appreinticeId) => {
    
    let rows = await query("select * from apprentices as a where a.app_id = ?", [appreinticeId]);

    if (rows.length === 0) {
        return "";
    }

    let user = rows[0];

    return user;
}

exports.updateApprenticeById = async (app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, apprentice_id) => {
    
    let rows = await query("UPDATE apprentices as a SET a.app_identification=?, a.app_name=?, a.app_ccms_id=?, a.app_sgva=?, a.app_group=?, a.app_ceco_id=?, a.app_job_description=?, a.app_related_position=?, a.app_sustaninig_support=?,  a.app_birthday=?, a.app_address=?, a.app_email=?, a.app_eps=?, a.app_city=?, a.app_institutions=?, a.app_speciality=?, a.app_name_boss=?, a.app_id_ccms_boss=?, a.app_category=?, a.app_yielded=?, a.app_state=?, a.app_contract_start_date=?, a.app_end_date_study=?, a.app_productive_start_date=?, a.app_productive_end_date=?, a.app_count_days=?, a.app_phone_number=? ,a.app_company=? WHERE a.app_id=?", [app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, apprentice_id]);

    if (rows.length === 0) {
        return "";
    }

    return;
}