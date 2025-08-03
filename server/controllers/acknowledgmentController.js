import {
  createAcknowledgment,
  getUserAcknowledgments,
  updateAcknowledgment,
  deleteAcknowledgment
} from '../models/acknowledgmentModel.js';

export const create = async (req, res) => {
  try {
    const { title, content, location, tags } = req.body;
    const acknowledgmentId = await createAcknowledgment(
      req.user.id,
      title,
      content,
      location,
      tags || []
    );
    res.status(201).json({ id: acknowledgmentId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const acknowledgments = await getUserAcknowledgments(req.user.id);
    res.json(acknowledgments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, location, tags } = req.body;
    
    const affectedRows = await updateAcknowledgment(
      id,
      req.user.id,
      title,
      content,
      location,
      tags || []
    );
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Acknowledgment not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteAcknowledgment(id, req.user.id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Acknowledgment not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};