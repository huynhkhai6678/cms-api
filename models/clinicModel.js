// Dont know why remove this file cause error on app
// Super annoy

import db from "../config/database.js";

const deleteClinic = (id) => {
  return db.query('DELETE FROM clinics WHERE id = ?', [id]);
};

export default  {
  deleteClinic
};