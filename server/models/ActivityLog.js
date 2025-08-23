const pool = require('../config/database');

class ActivityLog {
  static async create(logData) {
    await pool.execute(
      'INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)',
      [logData.userId, logData.action, logData.description, logData.ipAddress, logData.userAgent]
    );
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM activity_logs WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await pool.execute(
      `SELECT al.*, u.email, u.first_name, u.last_name 
       FROM activity_logs al 
       JOIN users u ON al.user_id = u.id 
       ORDER BY al.created_at DESC`
    );
    return rows;
  }

  static async getStats() {
    const [rows] = await pool.execute(`
      SELECT 
        COUNT(*) as total_actions,
        COUNT(DISTINCT user_id) as active_users,
        DATE(created_at) as date,
        action
      FROM activity_logs 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at), action
      ORDER BY date DESC
    `);
    return rows;
  }
}

module.exports = ActivityLog;