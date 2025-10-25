const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const createEmailTemplate = (title, body) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #333; text-align: center;">${title}</h2>
    <div style="font-size: 16px; color: #555;">
      ${body}
    </div>
    <p style="font-size: 14px; color: #888; margin-top: 20px;">
      Thanks,<br>The Studi.io Team
    </p>
  </div>
`;

const sendOTPEmailVerification = async (email, otp) => {
  const title = "Welcome to Studi.io!";
  const body = `
    <p>We're excited to have you on board. Please use the following One-Time Password (OTP) to verify your email address:</p>
    <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; text-align: center; margin: 20px 0;">
      ${otp}
    </h1>
    <p>This OTP will expire in 10 minutes.</p>
    <p>If you didn't create a Studi.io account, please ignore this email.</p>
  `;

  const mailOptions = {
    from: `"Studi.io Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Studi.io Email Verification Code",
    html: createEmailTemplate(title, body),
  };

  await transporter.sendMail(mailOptions);
};

const sendOTPForgotPassword = async (email, otp) => {
  const title = "Reset Your Studi.io Password";
  const body = `
    <p>We received a request to reset your password for your Studi.io account. Use the following OTP to proceed:</p>
    <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; text-align: center; margin: 20px 0;">
      ${otp}
    </h1>
    <p>This OTP will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, you can safely ignore this email. Your account is secure.</p>
  `;

  const mailOptions = {
    from: `"Studi.io Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Studi.io Password Reset Code",
    html: createEmailTemplate(title, body),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  transporter,
  sendOTPEmailVerification,
  sendOTPForgotPassword,
};
