const db = require("../config/db");

// Get all instructors
const getAllInstructors = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM instructors");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch instructors" });
  }
};

// Add a new instructor
const addInstructor = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO instructors (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: "Failed to add instructor" });
  }
};

module.exports = { getAllInstructors, addInstructor };
