const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Email route
app.post("/send-email", async (req, res) => {
  console.log("Received request:", req.body);

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