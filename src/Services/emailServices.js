const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from:`${data.email}` ,
      to: process.env.EMAIL_USER,
      subject: "Login Confirmation",
      text: `Hi ${data.firstName},\n\nYour login was successful!\n\nDetails:\nEmail: ${data.email}\nMobile: ${data.mobile}\nGender: ${data.gender}\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send email: " + error.message);
  }
};

module.exports = sendEmail;