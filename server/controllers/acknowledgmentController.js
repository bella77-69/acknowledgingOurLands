const pool = require("../config/db");

exports.createAcknowledgment = async (req, res) => {
  const { content } = req.body;
  await pool.query("INSERT INTO acknowledgments (user_id, content) VALUES (?, ?)", [
    req.user.id,
    content,
  ]);
  res.json({ message: "Acknowledgment saved" });
};

exports.getAcknowledgments = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM acknowledgments WHERE user_id = ?", [
    req.user.id,
  ]);
  res.json(rows);
};
