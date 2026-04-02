const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

const userEnrollment = async(req,res)=>{
    try{
        const {course_id}=req.body;
        const user_id = req.user.id;
        const course = await Course.findById(course_id);
        //find course
        if(!course){
            return res.status(404).json({message : "Couse not found"});
        }
        //find existEnroll
        const existEnroll =await Enrollment.findOne({user_id,course_id});
        if(existEnroll){
            return res.status(400).json({message : "Already enrolled"});
        }

        const enroll = await Enrollment.create({user_id,course_id});

        res.status(201).json({
            message :"Enrollment succesful",
            course_name : course.title
        });
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message : "Already enrolled"});
        }
        res.status(500).json({message : error.message});
    }
};

module.exports = userEnrollment;