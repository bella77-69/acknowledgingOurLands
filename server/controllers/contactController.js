const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = await ContactMessage.create({ name, email, subject, message });

    res.status(201).json({ message: "Message sent successfully.", data: newMessage });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
