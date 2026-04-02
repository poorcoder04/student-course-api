const express = require('express');
const router = express.Router();

const userEnrollment = require('../controllers/enrollmentController');
const {verifyToken,studentOnly}=require('../middleware/authMiddleware'); 

router.post('/',verifyToken,studentOnly,userEnrollment);
module.exports=router;