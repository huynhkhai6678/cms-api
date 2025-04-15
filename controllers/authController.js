import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

async function register(req, res) {
  const { name, email, password } = req.body;

  const [existingUser] = await User.findByEmail(email);
  if (existingUser.length > 0) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.createUser(name, email, hashedPassword);
  res.status(201).json({ message: 'User registered successfully' });
};

async function login(req, res) {

  const { email, password } = req.body;

  const [user] = await User.findByEmail(email);
  if (user.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  };

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.json({ token });
};

export default {
  register,
  login
}