const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.register = async (req, res) => {
  const { email, password, first_name, last_name, phone, address } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, password, first_name, last_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)", 
      [email, hashedPassword, first_name, last_name, phone, address]
    );
    res.status(201).json({ 
      message: "User registered successfully",
      user: { email, first_name, last_name } 
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ 
      message: err.code === 'ER_DUP_ENTRY' 
        ? "User already exists" 
        : "Registration failed" 
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // Return all user data except password
    const { password: _, ...userData } = user;
    res.json({ 
      token,
      user: userData
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, email, first_name, last_name, phone, address FROM users WHERE id = ?", [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;
  
  try {
    await pool.query(
      "UPDATE users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?",
      [first_name, last_name, phone, address, req.user.id]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
};
