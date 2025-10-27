const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Optional: Confirm backend is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Replace your old /send-email route with this
app.post("/send-email", async (req, res) => {
  console.log("Received request:", req.body); // Debug log

  const { name, email, recipient, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
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
    res.status(200).json({ status: "Message sent!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ status: "Failed to send message." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});