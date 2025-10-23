const OTP = require("../models/otp.model.js");
const User = require("../models/user.model.js");
const { generateOTP } = require("../constants/otp.generate.js");
const {
  sendOTPEmailVerification,
  sendOTPForgotPassword,
} = require("../config/nodemailer.config.js");
const sendEmailVerificationOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await OTP.deleteMany({ email: email });
    const otp = generateOTP();
    await OTP.create({ email: email, otp: otp });
    await sendOTPEmailVerification(email, otp);
    return res.status(200).json({message: "Otp sent successfully"})
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const otpRecord = await OTP.findOne({ email: email, otp: otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isVerified = true;
    await user.save();
    await OTP.deleteMany({ email });
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {}
};

const forgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await OTP.deleteMany({ email: email });
    const otp = generateOTP();
    await OTP.create({ email: email, otp: otp });
    await sendOTPForgotPassword(email, otp);
    return res.status(200).json({message: "Otp sent successfully"})
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendEmailVerificationOTP, verifyOTP, forgotPasswordOtp };
