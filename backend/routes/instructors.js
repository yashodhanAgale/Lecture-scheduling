const express = require("express");
const {
  getAllInstructors,
  addInstructor,
} = require("../controllers/instructorsController");
const router = express.Router();

router.get("/", getAllInstructors);
router.post("/", addInstructor);

module.exports = router;
