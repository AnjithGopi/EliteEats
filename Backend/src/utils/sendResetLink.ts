import nodemailer from "nodemailer";
import {Api} from "../config/constants/api"
import { frontEndURL } from "../config/constants/api";

export const sendPasswordResetLink = async (email:string, token:string,role:string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email credentials not configured in environment variables"
    );
  }

  if (!email || !token) {
    throw new Error("Email and OTP are required");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
       html: `
        <p>Click the link below to reset your password:</p>
        <p><a href="${frontEndURL}/${role}/reset-password/${token}" target="_blank">Click here to reset your password</a></p>
      `
      //text: `Click the following link to reset your password: ${role}/reset-password/${token}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error}`);
  }
};
