import db from "../config/database.js";
import moment from "moment";

const createSubscribe = (email, clinic_id) => {
  let createAt = moment().format('YYYY-MM-DD HH:mm:ss');
  return db.query('INSERT INTO enquiries (email, clinic_id, created_at, updated_at) VALUES (?, ?, ?, ?)', 
    [email, clinic_id, createAt, createAt]
  );
};

export default {
  createSubscribe
};