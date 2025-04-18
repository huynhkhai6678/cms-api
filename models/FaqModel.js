import db from "../config/database.js";

const getFaqForClinic = (clinicId) => {
  return db.query('SELECT * FROM faqs where clinic_id = ?', [clinicId]);
};

export default {
  getFaqForClinic
};