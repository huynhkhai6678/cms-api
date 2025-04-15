import db from "../config/database.js";

const findAllServiceOfTransaction = (id) => {
  return db.query('SELECT * FROM transaction_invoice_services WHERE transaction_invoice_id = ?', [id]);
};

export default {
  findAllServiceOfTransaction
}