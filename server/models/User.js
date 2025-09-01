const pool = require('../config/database');

class User {
  static async create({ email, password, firstName, lastName }) {
    const result = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [email, password, firstName, lastName]
    );
    return result.rows[0].id;
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, is_active, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(updates[key]);
    });

    values.push(id);

    await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${values.length}`,
      values
    );
  }

  static async findAll() {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role, is_active, created_at FROM users'
    );
    return result.rows;
  }
}

module.exports = User;
