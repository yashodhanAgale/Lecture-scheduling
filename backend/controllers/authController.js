const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Assuming your database connection is here

// Signup Controller
const signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );

    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login Controller
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
//       email,
//     ]);
//     if (user.length === 0) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Compare password with stored hash
//     const isValid = await bcrypt.compare(password, user[0].password);
//     if (!isValid) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user[0].id, email: user[0].email, role: user[0].role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password with stored hash
    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send only email and role in the response
    const userData = {
      id: user[0].id,
      email: user[0].email,
      role: user[0].role,
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData, // Send the user data (email and role) along with the token
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Protect routes middleware
const protectRoute = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data to the request
    next(); // Allow access to the next route
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { signup, login, protectRoute };
