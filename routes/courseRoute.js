const express = require("express");
const router = express.Router();

const {
    getCourses, 
    createCourse,
    updateCourse,
    deleteCourse} = require("../controllers/courseController");

const {verifyToken,teachersOnly}=require('../middleware/authMiddleware');

router.get("/", getCourses);
router.post("/create", verifyToken,teachersOnly, createCourse);
router.put("/:id",verifyToken,teachersOnly,updateCourse);
router.delete("/:id",verifyToken,teachersOnly,deleteCourse);
module.exports = router;