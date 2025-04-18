import db from "../config/database.js";

const countDoctorByClinicId = (clinicId) => {
  return db.query(
    `SELECT count(users.id) AS doctorCount FROM doctors 
    join users on users.id = doctors.user_id
    join user_clinics on user_clinics.user_id = users.id
    where user_clinics.clinic_id = ?`, 
    [clinicId]
  );
};

const getFrontDoctorByClinicId = (clinicId) => {
  return db.query(
    `SELECT users.id as user_id, doctors.id as doctor_id, concat(users.first_name, ' ', users.last_name) as name, 
    specializations.name as specialization,
    'web/media/avatars/male.png' as avatar
    FROM doctors
    join users on users.id = doctors.user_id
    join user_clinics on user_clinics.user_id = users.id
    join doctor_specialization on doctor_specialization.doctor_id = doctors.id
    join specializations on specializations.id = doctor_specialization.specialization_id
    left join media on (media.model_id = users.id and media.model_type = 'App\Models\User')
    where users.status = 1
    and specializations.id = (
      SELECT MIN(specializations.id)
      FROM doctor_specialization ds
      JOIN specializations ON specializations.id = ds.specialization_id
      WHERE ds.doctor_id = doctors.id
    )
    and user_clinics.clinic_id = ?`,
    [clinicId]
  );
};

const getFrontTopDoctorByClinicId = (clinicId) => {
  return db.query(
    `SELECT users.id as user_id, doctors.id as doctor_id, concat(users.first_name, ' ', users.last_name) as name, 
    specializations.name as specialization,
    'web/media/avatars/male.png' as avatar,
    COUNT(appointments.id) AS total_appointments
    FROM doctors
    join users on users.id = doctors.user_id
    join user_clinics on user_clinics.user_id = users.id
    join doctor_specialization on doctor_specialization.doctor_id = doctors.id
    join specializations on specializations.id = doctor_specialization.specialization_id
    join appointments on appointments.doctor_id = doctors.id
    left join media on (media.model_id = users.id and media.model_type = 'App\Models\User')
    where users.status = 1
    and specializations.id = (
      SELECT MIN(specializations.id)
      FROM doctor_specialization ds
      JOIN specializations ON specializations.id = ds.specialization_id
      WHERE ds.doctor_id = doctors.id
    )
    and user_clinics.clinic_id = ?
    ORDER BY total_appointments DESC
    LIMIT 3`,
    [clinicId]
  );
};

export default {
  countDoctorByClinicId,
  getFrontTopDoctorByClinicId,
  getFrontDoctorByClinicId
};