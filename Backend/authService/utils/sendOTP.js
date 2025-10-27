const transporter = require("../config/mailer");

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account",
    text: `Your verification code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
