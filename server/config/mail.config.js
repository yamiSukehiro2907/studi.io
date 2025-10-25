const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createEmailTemplate = (title, body) => `
  <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
    <div style="background-color: #10B981; color: white; text-align: center; padding: 20px 0;">
      <h2 style="margin: 0; font-size: 24px; letter-spacing: 0.5px;">${title}</h2>
    </div>
    <div style="padding: 24px; color: #374151; font-size: 16px; line-height: 1.6;">
      ${body}
      <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
        Thanks,<br><strong>The Studi.io Team</strong>
      </p>
    </div>
    <div style="background-color: #ecfdf5; text-align: center; padding: 12px; color: #065f46; font-size: 13px;">
      <p style="margin: 0;">© 2025 Studi.io — Learn. Build. Grow.</p>
    </div>
  </div>
`;

const sendOTPEmailVerification = async (email, otp) => {
  const title = "Welcome to Studi.io!";
  const body = `
    <p>We're thrilled to have you join Studi.io! Please verify your email by using the OTP below:</p>
    <h1 style="color: #10B981; font-size: 36px; letter-spacing: 5px; text-align: center; margin: 24px 0;">
      ${otp}
    </h1>
    <p>This OTP will expire in <strong>10 minutes</strong>.</p>
    <p>If you didn’t sign up for Studi.io, please ignore this email.</p>
  `;

  const msg = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Verify Your Studi.io Account",
    html: createEmailTemplate(title, body),
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ SendGrid error:", error);
    throw error;
  }
};

const sendOTPForgotPassword = async (email, otp) => {
  const title = "Reset Your Studi.io Password";
  const body = `
    <p>We received a password reset request for your Studi.io account. Use the OTP below to continue:</p>
    <h1 style="color: #10B981; font-size: 36px; letter-spacing: 5px; text-align: center; margin: 24px 0;">
      ${otp}
    </h1>
    <p>This OTP will expire in <strong>10 minutes</strong>.</p>
    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
  `;

  const msg = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Your Studi.io Password Reset Code",
    html: createEmailTemplate(title, body),
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Password reset email sent");
  } catch (error) {
    console.error("❌ SendGrid error:", error);
    throw error;
  }
};

module.exports = {
  sendOTPEmailVerification,
  sendOTPForgotPassword,
};
