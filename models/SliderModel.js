import db from "../config/database.js";

const getSliderForClinic = (clinicId) => {
  return db.query('SELECT * FROM sliders where clinic_id = ?', [clinicId]);
};

export default {
  getSliderForClinic
};