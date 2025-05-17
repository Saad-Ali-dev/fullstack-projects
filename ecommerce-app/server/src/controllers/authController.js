import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/emailSender.js";

const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user account
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Token expires in 1 day
    );

    // Send welcome email (asynchronously, don't let email failure block registration response)
    const emailOptions = {
      email: newUser.email,
      subject: "Welcome to Amazon Clone! ( Demo Project by Saad Ali )",
      html: `
        <h1>Welcome, ${newUser.name}!</h1>
        <p>Your account has been successfully created at Amazon Clone.</p>
        <p>This is just a demo project made by Saad Ali.</p>
        <p>Contact me at a.saadmughal57@gmail.com</p>
        <br/>
        <p>Best regards,</p>
        <p>Saad Ali</p>
      `,
    };

    sendEmail(emailOptions)
      .then((emailResult) => {
        if (emailResult.success) {
          console.log(`Welcome email sent successfully to ${newUser.email}`);
        } else {
          console.error(
            `Failed to send welcome email to ${newUser.email}: ${emailResult.error}`,
          );
          // You might want to log this to a more persistent error tracking service
        }
      })
      .catch((emailError) => {
        // Catch any unexpected errors from sendEmail promise itself
        console.error(
          `Unexpected error sending welcome email to ${newUser.email}:`,
          emailError,
        );
      });

    // Respond with success message, token, and user info (excluding password)
    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    // Handle specific MongoDB duplicate key error for email, though explicit check is better
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }
    res.status(500).json({
      message: "Server error during registration.",
      details: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Fetch User Data
    const user = await User.findOne({ email });

    // Check if User Found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." }); // Use 401 for auth failure
    }

    // Validate Password
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid credentials." }); // Use 401
    }

    // Prepare response data (excluding password)
    const responseData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Respond with success message, token, and user data
    res.status(200).json({
      message: "Logged in successfully.",
      data: responseData,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Server error during login.", details: error.message });
  }
};
