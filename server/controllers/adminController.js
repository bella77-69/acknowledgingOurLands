const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const Acknowledgment = require('../models/Acknowledgment');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await ActivityLog.findByUserId(userId);
    res.json({ activities });
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.findAll();
    res.json({ activities });
  } catch (error) {
    console.error('Get all activities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await ActivityLog.getStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    await User.update(userId, { is_active: isActive });

    // Log activity
    await ActivityLog.create({
      userId: req.user.id,
      action: 'update_user_status',
      description: `Updated user ${userId} status to ${isActive ? 'active' : 'inactive'}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.update(userId, { is_active: false });

    // Log activity
    await ActivityLog.create({
      userId: req.user.id,
      action: 'delete_user',
      description: `Deleted user ${userId}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};