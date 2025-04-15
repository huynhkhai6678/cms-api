import db from "../config/database.js";

function findByEmail(email) {
  return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

function createUser(name, email, hashedPassword) {
  return db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
};

export default {
  findByEmail,
  createUser
}