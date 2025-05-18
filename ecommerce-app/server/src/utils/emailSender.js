import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (options) => {
  // 1. Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_FROM_ADDRESS,
      pass: process.env.APP_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    // 3. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    let errorMessage = "Failed to send email.";
    if (error.code === "EAUTH") {
      errorMessage =
        "Authentication failed. Check your email credentials (EMAIL_FROM_ADDRESS, APP_PASSWORD) in the .env file and Gmail account settings (App Password, Less Secure App Access if not using 2FA).";
    } else if (error.code === "ECONNREFUSED") {
      errorMessage =
        "Connection refused. Check your SMTP host (EMAIL_HOST) and port (EMAIL_PORT).";
    } else if (error.responseCode === 535) {
      errorMessage =
        "Authentication credentials invalid (535). Please verify your App Password and Gmail settings.";
    }
    return {
      success: false,
      error: errorMessage,
      originalError: error.message,
    };
  }
};

export default sendEmail;
