import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// 🔐 Hash password
export const hashPassword = async (plainPassword: string) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// 🔐 Compare password
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};