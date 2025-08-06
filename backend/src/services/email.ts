
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
// Create a transporter object
const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});
export const sendMail = async (to: string, token: string, name: string): Promise<void> => {
    const mailOptions: SendMailOptions = {
        from: process.env.EMAIL,
        to,
        subject: 'Welcome to Certi-Verify, Verify your email',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Certi-Verify</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #4e54c8, #8f94fb);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #ffffff;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      color: #333333;
    }
    .header {
      background: linear-gradient(135deg, #4e54c8, #8f94fb);
      padding: 30px;
      text-align: center;
      color: #fff;
    }
    .content {
      padding: 30px;
    }
    .content h1 {
      font-size: 24px;
      margin-bottom: 15px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .verify-button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      background-color: #4e54c8;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #aaa;
      background-color: #f5f5f5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Certi-Verify, ${name}!</h1>
    </div>
    <div class="content">
      <p>We're excited to have you on board. Certi-Verify helps you verify and manage certifications with ease.</p>
      <p>To get started, please verify your email address by clicking the button below:</p>
      <a href="https://certi-verify.onrender.com/verify-email?token=${token}" class="verify-button">Verify Email</a>
    </div>
    <div class="footer">
      &copy; 2025 Certi-Verify. All rights reserved.
    </div>
  </div>
</body>
</html>

`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error: Error | null, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}