const pool = require('../config/database')

class ActivityLog {
  static async create({ userId, action, description, ipAddress, userAgent }) {
    await pool.query(
      `INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, action, description, ipAddress, userAgent]
    );
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM activity_logs WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findAll() {
    const result = await pool.query(`
      SELECT al.*, u.email, u.first_name, u.last_name
      FROM activity_logs al
      JOIN users u ON al.user_id = u.id
      ORDER BY al.created_at DESC
    `);
    return result.rows;
  }

  static async getStats() {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total_actions,
        COUNT(DISTINCT user_id) AS active_users,
        DATE(created_at) AS date,
        action
      FROM activity_logs
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at), action
      ORDER BY date DESC
    `);
    return result.rows;
  }
}

module.exports = ActivityLog;
