SELECT adonix_db;

INSERT INTO roles (rol_name) VALUES ('Administrator');
INSERT INTO roles (rol_name) VALUES ('Manager');
INSERT INTO roles (rol_name) VALUES ('Employee');


INSERT INTO users (use_identification_number, use_name, use_password, use_email, use_rol_id) VALUES ('1234567890', 'User Administrator', 'Password123', 'administrator@email.com', 1);
INSERT INTO users (use_identification_number, use_name, use_password, use_email, use_rol_id) VALUES ('1234567891', 'User Manager', 'Password123', 'manager@email.com', 2);
INSERT INTO users (use_identification_number, use_name, use_password, use_email, use_rol_id) VALUES ('1234567892', 'User Employee', 'Password123', 'employee@email.com', 3);


INSERT INTO apprentices (app_identification, app_name, app_ccms_id, app_sgva, app_group, app_ceco_id, app_job_description, app_related_position, app_sustaninig_support,  app_birthday, app_address, app_email, app_eps, app_city, app_institutions, app_speciality, app_name_boss, app_id_ccms_boss, app_category, app_yielded, app_state, app_contract_start_date, app_end_date_study, app_productive_start_date, app_productive_end_date, app_count_days, app_phone_number ,app_company, app_creator_id) VALUES 
('77886', 'Aprendiz de Prueba 2', 3434, 666, 12345, 1234567, 'Job Desciption Example', 'Relate Position Example', 456789, now(), 'Example Address', 'apprentice.example@email.com',  'EPS Example', 'Bogota', 'SENA', 'Speciality Example', 'Name Boss Example', 11111, 'Category Example', 'Yielded Example', 'Productive', now(), now(), now(), now(), 180, '+57 312 231 7878', 'Teleperformance', 1);
