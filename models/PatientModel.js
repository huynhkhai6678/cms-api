import db from "../config/database.js";

const countPatientByClinicId = (clinicId) => {
  return db.query('SELECT count(*) AS patientCount FROM users where type = 3 and clinic_id = ?', [clinicId]);
};

export default {
  countPatientByClinicId
};