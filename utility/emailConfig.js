import nodemailer from "nodemailer";
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

