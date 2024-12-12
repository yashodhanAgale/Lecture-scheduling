const express = require("express");
const {
  assignLecture,
  getAllLectures,
} = require("../controllers/lecturesController");
const router = express.Router();

// Get all lectures
router.get("/", getAllLectures);

// Assign a lecture
router.post("/", assignLecture);

module.exports = router;
