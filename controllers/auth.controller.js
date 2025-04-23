import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import db from '../models/index.js';

async function register(req, res) {
  const { name, email, password } = req.body;

  const [existingUser] = await User.findByEmail(email);
  if (existingUser.length > 0) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.User.create(name, email, hashedPassword);
  res.status(201).json({ message: 'User registered successfully' });
};

async function login(req, res) {

  const { email, password } = req.body;

  const currentUser = await db.User.findOne({
    where: {
      email: email
    }
  });

  const isMatch = await bcrypt.compare(password, currentUser.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });


  const role = await db.Role.findByPk(currentUser.type, {
    include: [
      {
        model: db.Permission,
        attributes: ['name'],
        through: { attributes: [] }, // Hide pivot table fields
      }
    ]
  });

  if (!role) {
    console.log(`Role with ID ${currentUser.type} not found.`);
    return null;
  }

  const data = {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.first_name + ' ' + currentUser.last_name,
    contact: currentUser.contact,
    region_code: currentUser.region_code,
    type: currentUser.type,
    dark_mode: currentUser.dark_mode,
    clinic_id: currentUser.clinic_id,
    language: currentUser.language
  }

  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({
    token,
    data,
    permissions: role.Permissions.map(p => p.name)
  });

};

export default {
  register,
  login
}