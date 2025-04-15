import db from "../config/database.js";

const getAllCurrencies = () => {
  return db.query('SELECT * FROM currencies');
};

const getCurrencyByCode = (code) => {
  return db.query('SELECT * FROM currencies where currency_code = ?', [code]);
};

const getCurrencyById = (id) => {
  return db.query('SELECT * FROM currencies where id = ?', [id]);
};


export default {
  getCurrencyByCode,
  getCurrencyById,
  getAllCurrencies
};