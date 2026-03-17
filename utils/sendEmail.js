const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendCredentialsEmail = async (email, password, role) => {
  try {

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Internship Portal Login Credentials",
      html: `
        <h2>Welcome to Internship Portal</h2>

        <p>Your account has been created successfully.</p>

        <p><b>Role:</b> ${role}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>

        <p>Please login and change your password.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully to:", email);

  } catch (error) {

    console.error("Email sending failed:", error);

  }
};

module.exports = sendCredentialsEmail;