import db from "../config/database.js";
import moment from "moment";

const createEnquiry = (name, email, phone, subject, message, clinic_id) => {
  let createAt = moment().format('YYYY-MM-DD HH:mm:ss');
  return db.query('INSERT INTO enquiries (name, email, phone, subject, message, clinic_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [name, email, phone, subject, message, clinic_id, createAt, createAt]
  );
};

export default {
  createEnquiry
};