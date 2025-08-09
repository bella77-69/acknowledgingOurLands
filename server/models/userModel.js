import db from "../config/db.config.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  const [rows] = await db.execute("SELECT id, username, email FROM users");
  return rows;
};

export const findUserById = async (id) => {
  const [rows] = await db.execute(
    "SELECT username, email FROM users WHERE id = ?",
    [id]
  );
  if (rows.length === 0) throw new Error("User not found");
  return rows[0];
};

export const verifyUser = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length === 0) throw new Error("User not found");
  return rows[0];
};

export const registerUser = async (full_name, username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 5);
  const [result] = await db.execute(
    "INSERT INTO users (full_name, username, password, email) VALUES (?, ?, ?, ?)",
    [full_name, username, hashedPassword, email]
  );
  return { id: result.insertId, full_name, username, email };
};

export const createUser = async (full_name, username, email, password) => {
  if (!full_name || !username || !email || !password) {
    throw new Error("Missing required parameters");
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const [result] = await db.execute(
    "INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)",
    [full_name, username, email, hashedPassword]
  );
  return { id: result.insertId, full_name, username, email};
};

export const findUserByEmailWithPassword = async (email) => {
  const [rows] = await db.execute(
    "SELECT id, email, password, full_name, username FROM users WHERE email = ?",
    [email]
  );
  if (rows.length === 0) return null;
  return rows[0];
};

// NEW: Password comparison method
export const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// NEW: Get user by ID without sensitive data
export const findUserByIdSafe = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, username, email, full_name FROM users WHERE id = ?",
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0];
};