import pool from '../config/config.js';

export const createUser = async (username, email, password) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result.insertId;
};

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
  return rows[0];
};