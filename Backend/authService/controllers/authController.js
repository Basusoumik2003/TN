const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const generateUID = require("../utils/generateUID");
const sendOTP = require("../utils/sendOTP");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (userCheck.rows.length > 0) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const roleRes = await pool.query("SELECT id FROM roles WHERE role_name=$1", [role.toUpperCase()]);
    const roleId = roleRes.rows[0]?.id;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000);

    const userRes = await pool.query(
      `INSERT INTO users (username, email, password, role_id, otp_code, otp_expires_at)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [username, email, hashed, roleId, otp, expiresAt]
    );

    const userId = userRes.rows[0].id;
    const u_id = generateUID("USR", userId);
    await pool.query("UPDATE users SET u_id=$1 WHERE id=$2", [u_id, userId]);

    await sendOTP(email, otp);

    res.status(201).json({ message: "OTP sent. Verify your email." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = result.rows[0];
    if (user.otp_code !== otp || new Date() > user.otp_expires_at)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await pool.query("UPDATE users SET verified=true, otp_code=NULL WHERE email=$1", [email]);

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("🟢 Login attempt for:", email);

    const userRes = await pool.query(
      `SELECT u.*, r.role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       WHERE u.email=$1`,
      [email]
    );

    console.log("📦 Query result:", userRes.rows);

    if (userRes.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userRes.rows[0];
    console.log("👤 User record fetched:", user);

    const valid = await bcrypt.compare(password, user.password);
    console.log("🔐 Password valid?", valid);

    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    if (!user.verified)
      return res.status(403).json({ message: "Verify your email first" });

    const token = jwt.sign(
      { id: user.id, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("🪶 Inserting token into DB...");
    await pool.query(
      "INSERT INTO tokens (user_id, token, token_type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL '1 day')",
      [user.id, token, "ACCESS"]
    );
    console.log("✅ Token stored successfully");


    res.json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    u_id: user.u_id,
    username: user.username,
    email: user.email,
    role_name: user.role_name,
    verified: user.verified,
  },
});
  } catch (err) {
    console.error("❌ Login Error Details:", err);
    res.status(500).json({
      message: "Server error. Please try again later.",
      error: err.message,
    });
  }
};

