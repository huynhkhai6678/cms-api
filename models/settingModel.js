import db from "../config/database.js";

const getAllSettingByClinic = (clinicId = 1) => {
  return db.query('SELECT * FROM settings where clinic_id = ?', [clinicId]);
};

export default {
  getAllSettingByClinic
};