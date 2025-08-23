const Acknowledgment = require('../models/Acknowledgment');
const ActivityLog = require('../models/ActivityLog');

// Basic validation
const isValidAcknowledgment = (data) => {
  return data.title && data.content && data.territory && data.traditionalKeepers;
};

exports.createAcknowledgment = async (req, res) => {
  try {
    const { title, content, territory, traditionalKeepers, isPublic } = req.body;

    // Basic validation
    if (!isValidAcknowledgment({ title, content, territory, traditionalKeepers })) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const ackId = await Acknowledgment.create({
      userId: req.user.id,
      title: title.trim(),
      content: content.trim(),
      territory: territory.trim(),
      traditionalKeepers: traditionalKeepers.trim(),
      isPublic: isPublic || false
    });

    // Log activity
    await ActivityLog.create({
      userId: req.user.id,
      action: 'create_acknowledgment',
      description: `Created acknowledgment: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({
      message: 'Acknowledgment created successfully',
      acknowledgmentId: ackId
    });
  } catch (error) {
    console.error('Create acknowledgment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserAcknowledgment = async (req, res) => {
  try {
    const acknowledgments = await Acknowledgment.findByUserId(req.user.id);
    res.json({ acknowledgments });
  } catch (error) {
    console.error('Get acknowledgments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAcknowledgment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, territory, traditionalKeepers, isPublic } = req.body;

    // Verify ownership
    const acknowledgment = await Acknowledgment.findById(id);
    if (!acknowledgment || acknowledgment.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Acknowledgment not found' });
    }

    await Acknowledgment.update(id, {
      title,
      content,
      territory,
      traditional_keepers: traditionalKeepers,
      is_public: isPublic
    });

    // Log activity
    await ActivityLog.create({
      userId: req.user.id,
      action: 'update_acknowledgment',
      description: `Updated acknowledgment: ${title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Acknowledgment updated successfully' });
  } catch (error) {
    console.error('Update acknowledgment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAcknowledgment = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const acknowledgment = await Acknowledgment.findById(id);
    if (!acknowledgment || acknowledgment.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Acknowledgment not found' });
    }

    await Acknowledgment.delete(id);

    // Log activity
    await ActivityLog.create({
      userId: req.user.id,
      action: 'delete_acknowledgment',
      description: `Deleted acknowledgment: ${acknowledgment.title}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({ message: 'Acknowledgment deleted successfully' });
  } catch (error) {
    console.error('Delete acknowledgment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPublicAcknowledgment = async (req, res) => {
  try {
    const acknowledgments = await Acknowledgment.findAllPublic();
    res.json({ acknowledgments });
  } catch (error) {
    console.error('Get public acknowledgments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const acknowledgments = await Acknowledgment.findByUserId(req.user.id);
    
    const total = acknowledgments.length;
    const publicCount = acknowledgments.filter(ack => ack.is_public).length;
    
    // Find most recent acknowledgment
    let lastActivity = null;
    if (acknowledgments.length > 0) {
      const sorted = [...acknowledgments].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      lastActivity = sorted[0].created_at;
    }

    res.json({
      totalAcknowledgments: total,
      publicAcknowledgments: publicCount,
      lastActivityDate: lastActivity,
      // You can add more stats here:
      privateAcknowledgments: total - publicCount,
      // Percentage public
      publicPercentage: total > 0 ? Math.round((publicCount / total) * 100) : 0
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};