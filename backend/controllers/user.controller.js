import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignUp = async (req, res) => {
  try {
    const { name, category, email, contactNumber, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", status: "error" });
    }

    const user = new User({
      name,
      category,
      email,
      contactNumber,
      password,
    });

    await user.save();
    const token = jwt.sign(
      { userId: user._id, email: user.email, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        message: "User registered successfully!",
        status: "success",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          category: user.category,
        },
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error", status: "error" });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "error",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: "error",
      });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: user._id, category: user.category },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // 4. Send token in cookie
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, 
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({
        message: "Login successful",
        status: "success",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          category: user.category,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", status: "error" });
  }
};

const LogOut = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: "No token found" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",   // must match SignIn
    secure: true,       // must match SignIn
    path: "/",          // default path, should also match
  });

  res.status(200).json({ message: "Logged out successfully" });
};


const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in /me:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export { SignUp, SignIn, getUserProfile , LogOut };
