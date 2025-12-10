import Auth from "../models/auth.schema.js";
import validator from "email-validator";
import JsonWebToken from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import bcrypt from "bcryptjs";

// ---------------- PRE-SIGNUP (Direct Signup - NO EMAIL VERIFICATION) ----------------
const preSignup = async (req, res) => {
  try {
    console.log("📥 Pre-Signup request received:", req.body);
    
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.json({ error: "Both Email and password are required" });
    }

    if (!validator.validate(email)) {
      return res.json({ error: "Please Enter correct Email" });
    }

    // 2. Check if user exists
    const userExists = await Auth.findOne({ email });
    if (userExists) {
      return res.json({ error: "This Email is already Registered" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user in database
    const newUser = await new Auth({
      email,
      password: hashedPassword,
      role: "user"
    }).save();

    console.log("✅ User created in DB:", newUser.email);

    // 5. Generate JWT token
    const token = JsonWebToken.sign(
      { 
        id: newUser._id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Send response
    return res.json({
      success: true,
      message: "Signup successful! You are login",
      token,
      user: { 
        id: newUser._id,
        email: newUser.email, 
        role: newUser.role 
      }
    });

  } catch (err) {
    console.error("❌ Pre-Signup error:", err);
    return res.json({ 
      success: false,
      error: err.message 
    });
  }
};

// ---------------- SIGNUP (For token verification - optional) ----------------
const signup = async (req, res) => {
  try {
    // Agar token verification chahiye toh yahan logic likho
    // Lekin agar direct signup chahiye toh sirf yeh bhejo:
    return res.json({ 
      message: "Use /pre-signup endpoint for direct signup" 
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.json({ 
      success: false,
      error: err.message 
    });
  }
};

// ---------------- LOGIN ----------------
const login = async (req, res) => {
  try {
    console.log("📥 Login request received:", req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ error: "Both Email and password are required" });
    }

    if (!validator.validate(email)) {
      return res.json({ error: "Please Enter Correct Email" });
    }

    // Find user
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.json({ error: "This email is not registered,plz Signup first" });
    }

    // Compare password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.json({ error: "Password is incorrect" });
    }

    // Generate JWT
    const token = JsonWebToken.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful!",
      token,
      user: { 
        id: user._id,
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.json({
      success: false,
      error: err.message 
    });
  }
};

// Export all three functions
export { preSignup, signup, login };