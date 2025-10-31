const transporter = require("../config/mailer");

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account",
    text: `Your verification code is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✉️  OTP sent:", info.response || info);
    return info;
  } catch (err) {
    console.error("❌ sendOTP error:", err);
    throw err; // important: rethrow so caller knows mail failed
  }
};

module.exports = sendOTP;
