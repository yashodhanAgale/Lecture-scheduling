const express = require("express");
const {
  getAllCourses,
  addCourse,
} = require("../controllers/coursesController");
const router = express.Router();

router.get("/", getAllCourses); // Fetch all courses
router.post("/", addCourse); // Add a new course

module.exports = router;
