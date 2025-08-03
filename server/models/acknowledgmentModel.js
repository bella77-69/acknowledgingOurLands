import pool from '../config/config.js';

export const createAcknowledgment = async (userId, title, content, location, tags) => {
  const [result] = await pool.query(
    'INSERT INTO acknowledgments (user_id, title, content, location, tags) VALUES (?, ?, ?, ?, ?)',
    [userId, title, content, location, JSON.stringify(tags)]
  );
  return result.insertId;
};

export const getUserAcknowledgments = async (userId) => {
  const [rows] = await pool.query(
    'SELECT id, title, content, location, tags, created_at FROM acknowledgments WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows.map(row => ({
    ...row,
    tags: row.tags ? JSON.parse(row.tags) : []
  }));
};

export const updateAcknowledgment = async (id, userId, title, content, location, tags) => {
  const [result] = await pool.query(
    'UPDATE acknowledgments SET title = ?, content = ?, location = ?, tags = ? WHERE id = ? AND user_id = ?',
    [title, content, location, JSON.stringify(tags), id, userId]
  );
  return result.affectedRows;
};

export const deleteAcknowledgment = async (id, userId) => {
  const [result] = await pool.query(
    'DELETE FROM acknowledgments WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return result.affectedRows;
};