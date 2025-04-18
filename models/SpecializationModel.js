import db from "../config/database.js";

const countSpecializationByClinicId = (clinicId) => {
  return db.query('SELECT count(*) AS specializationCount FROM specializations where clinic_id = ?', [clinicId]);
};

export default {
  countSpecializationByClinicId
};