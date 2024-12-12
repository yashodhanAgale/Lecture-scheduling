const db = require("../config/db");

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM courses");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Add a new course
const addCourse = async (req, res) => {
  const { name, level, description, image } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO courses (name, level, description, image) VALUES (?, ?, ?, ?)",
      [name, level, description, image]
    );
    res
      .status(201)
      .json({ id: result.insertId, name, level, description, image });
  } catch (error) {
    res.status(500).json({ error: "Failed to add course" });
  }
};

module.exports = { getAllCourses, addCourse };
