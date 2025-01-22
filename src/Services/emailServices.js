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

    // Different messages for user creation and login
    const userMessage = data.login 
      ? `Hi ${data.firstName},\n\nYour login was successful!\n\nDetails:\nEmail: ${data.email}\nMobile: ${data.mobile}\nGender: ${data.gender}\n\nBest regards,\nYour Team`
      : `Hi ${data.firstName},\n\nWelcome! Your registration was successful.\n\nDetails:\nEmail: ${data.email}\nMobile: ${data.mobile}\nGender: ${data.gender}\n\nBest regards,\nYour Team`;

    const clientMessage = data.login
      ? `User ${data.firstName} ${data.lastName} has logged in.\n\nDetails:\nEmail: ${data.email}\nMobile: ${data.mobile}\nGender: ${data.gender}`
      : `New user ${data.firstName} ${data.lastName} has registered.\n\nDetails:\nEmail: ${data.email}\nMobile: ${data.mobile}\nGender: ${data.gender}`;

    // Email to the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: data.login ? "Login Confirmation" : "Registration Confirmation",
      text: userMessage,
    };

    // Email to the client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to the client (yourself)
      subject: data.login ? "User Login Notification" : "New User Registration",
      text: clientMessage,
    };

    // Sending the email to the user
    await transporter.sendMail(userMailOptions);

    // Sending the email to the client
    await transporter.sendMail(clientMailOptions);

  } catch (error) {
    throw new Error("Failed to send email: " + error.message);
  }
};

module.exports = sendEmail;
