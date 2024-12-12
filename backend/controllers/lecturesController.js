const db = require("../config/db");

// Get all lectures
const getAllLectures = async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT lectures.id, lectures.date, lectures.instructor_id, instructors.name AS instructor_name,
                   courses.name AS course_name
            FROM lectures
            JOIN instructors ON lectures.instructor_id = instructors.id
            JOIN courses ON lectures.course_id = courses.id
        `);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
};

// Assign a lecture
const assignLecture = async (req, res) => {
  const { course_id, instructor_id, date } = req.body;

  try {
    // 1. Validate instructor_id
    const [instructorExists] = await db.query(
      "SELECT * FROM instructors WHERE id = ?",
      [instructor_id]
    );

    if (instructorExists.length === 0) {
      return res.status(400).json({ error: "Invalid instructor_id" });
    }

    // 2. Validate course_id
    const [courseExists] = await db.query(
      "SELECT * FROM courses WHERE id = ?",
      [course_id]
    );

    if (courseExists.length === 0) {
      return res.status(400).json({ error: "Invalid course_id" });
    }

    // 3. Check for schedule conflict
    const [conflictExists] = await db.query(
      "SELECT * FROM lectures WHERE instructor_id = ? AND date = ?",
      [instructor_id, date]
    );

    if (conflictExists.length > 0) {
      return res.status(400).json({
        error: "Instructor is already scheduled for a lecture on this date",
      });
    }

    // 4. Insert the lecture
    const [result] = await db.query(
      "INSERT INTO lectures (course_id, instructor_id, date) VALUES (?, ?, ?)",
      [course_id, instructor_id, date]
    );

    // 5. Return success response
    res.status(201).json({
      message: "Lecture created successfully",
      lectureId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ error: "Failed to create lecture" });
  }
};

module.exports = { getAllLectures, assignLecture };
