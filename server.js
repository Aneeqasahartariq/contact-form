const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Email route
app.post("/send-email", async (req, res) => {
  const { name, email, recipient, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aneeqasahartariq@gmail.com",       // Replace with your Gmail
      pass: "dtgm grdh wzdm fbmt"           // Use App Password from Google
    }
  });

  const mailOptions = {
    from: email,
    to: recipient,
    subject: `Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ status: "Failed to send message." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});