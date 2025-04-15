import db from "../config/database.js";

const findById = (id) => {
  return db.query('SELECT * FROM transaction_invoices WHERE id = ?', [id]);
};

export default {
  findById
}