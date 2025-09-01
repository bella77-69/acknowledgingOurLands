const pool = require('../config/database');

class Acknowledgment {
  static async create({ userId, title, content, territory, traditionalKeepers, isPublic }) {
    const result = await pool.query(
      `INSERT INTO acknowledgments (user_id, title, content, territory, traditional_keepers, is_public)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, title, content, territory, traditionalKeepers, isPublic]
    );
    return result.rows[0].id;
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM acknowledgments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM acknowledgments WHERE id = $1',
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
    
    values.push(id); // last value for WHERE clause

    await pool.query(
      `UPDATE acknowledgments SET ${fields.join(', ')} WHERE id = $${values.length}`,
      values
    );
  }

  static async delete(id) {
    await pool.query(
      'DELETE FROM acknowledgments WHERE id = $1',
      [id]
    );
  }

  static async findAllPublic() {
    const result = await pool.query(
      `SELECT a.*, u.first_name, u.last_name 
       FROM acknowledgments a
       JOIN users u ON a.user_id = u.id
       WHERE a.is_public = TRUE
       ORDER BY a.created_at DESC`
    );
    return result.rows;
  }
}

module.exports = Acknowledgment;