const pool = require('../config/database');

class Acknowledgment {
  static async create(ackData) {
    const [result] = await pool.execute(
      'INSERT INTO acknowledgments (user_id, title, content, territory, traditional_keepers, is_public) VALUES (?, ?, ?, ?, ?, ?)',
      [ackData.userId, ackData.title, ackData.content, ackData.territory, ackData.traditionalKeepers, ackData.isPublic]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM acknowledgments WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM acknowledgments WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    });
    
    values.push(id);
    
    await pool.execute(
      `UPDATE acknowledgments SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  static async delete(id) {
    await pool.execute(
      'DELETE FROM acknowledgments WHERE id = ?',
      [id]
    );
  }

  static async findAllPublic() {
    const [rows] = await pool.execute(
      `SELECT a.*, u.first_name, u.last_name 
       FROM acknowledgments a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.is_public = TRUE 
       ORDER BY a.created_at DESC`
    );
    return rows;
  }
}

module.exports = Acknowledgment;