import db from "../config/database.js";

const getTestimonialByClinic = (clinicId) => {
  return db.query('SELECT * FROM front_patient_testimonials where clinic_id = ?', [clinicId]);
};

export default {
  getTestimonialByClinic
};