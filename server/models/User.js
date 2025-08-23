const pool = require('../config/database');

class User {
  static async create(userData) {
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
      [userData.email, userData.password, userData.firstName, userData.lastName]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, email, first_name, last_name, role, is_active, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

static async update(id, updates) {
  try {
    const fields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    });
    
    values.push(id);
    
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  } catch (error) {
    throw error;
  }
}

  static async findAll() {
    const [rows] = await pool.execute(
      'SELECT id, email, first_name, last_name, role, is_active, created_at FROM users'
    );
    return rows;
  }
}

module.exports = User;