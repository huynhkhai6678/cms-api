import db from "../config/database.js";

const countServiceByClinicId = (clinicId) => {
  return db.query('SELECT count(*) AS serviceCount FROM services where status = true and clinic_id = ?', [clinicId]);
};

const getServiceByClinic = (clinicId) => {
  return db.query('SELECT * FROM services where clinic_id = ?', [clinicId]);
};

export default {
  countServiceByClinicId,
  getServiceByClinic
};