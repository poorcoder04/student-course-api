const express = require('express');
const { verifyToken, studentOnly } = require('../middleware/authMiddleware');
const myCourse = require('../controllers/mycourseController');
const router = express.Router();

router.get('/',verifyToken,studentOnly,myCourse);
module.exports = router;

