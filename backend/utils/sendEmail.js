const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'smtp', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

/**
 * Sends an email.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text body of the email.
 * @param {string} [html] - The HTML body of the email (optional).
 * @returns {Promise} - A promise that resolves when the email is sent.
 */
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
      html: html, // HTML body (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw new Error("Error sending email: " + error.message);
  }
};

module.exports = sendEmail;
