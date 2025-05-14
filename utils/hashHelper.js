import bcrypt from "bcryptjs";
const saltRounds = 10;

export const hashData = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}