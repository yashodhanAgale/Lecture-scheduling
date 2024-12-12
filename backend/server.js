const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const instructorsRoutes = require("./routes/instructors");
const coursesRoutes = require("./routes/courses");
const lecturesRoutes = require("./routes/lectures");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes); // Register auth routes

// Instructors route
app.use("/instructors", instructorsRoutes);
// Add the courses route
app.use("/courses", coursesRoutes);
// Add the lectures route
app.use("/lectures", lecturesRoutes);

app.use("/admin", adminRoutes); // Register the admin routes under `/admin`

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
