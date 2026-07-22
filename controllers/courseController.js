const Course = require('../models/course');
//GET request
const getCourses = async(req,res)=>{
    try{
        const courses = await Course.find();
        res.json(courses);
    }catch(error){
        res.status(500).json({message : "server error"});
    }
};
//POST request
const createCourse = async(req,res)=>{
    try{
        const{title,price,description,duration,weekly_class,level,language
            ,started_date,max_seat}=req.body;
        const teacher_id = req.user.id;
        const existCourse =await Course.findOne({title});
        if(existCourse){
            return res.status(400).json({message : "Course already exist"});
        }
        const course = new Course({title,price,description,duration,weekly_class,level,language
            ,started_date,max_seat,teacher_id});
        await course.save();
        res.status(201).json(course);
    }catch(error){
        res.status(500).json({message : "Server error"});
    }
};

//PUT(update) request

const updateCourse = async(req,res)=>{
    try{
        const {id}=req.params;//get course id from url
         const{title,price,description,duration,weekly_class,level,language
            ,started_date,max_seat}=req.body;

        const request_teacher_id = req.user.id;
        const course = await Course.findById(id);

        if(!course){
            return res.status(404).json({message : "Course not found"});
        }

        if(request_teacher_id!=course.teacher_id){
            return res.status(400).json({message : "Not allowed to update"});
        }

        const update_course =await Course.findOneAndUpdate({_id : id},{title,price,description,duration,weekly_class,level,language
            ,started_date,max_seat},{
                new : true
            });
        res.json({message : "Update succesfull",update_course});
    }catch(error){
        res.status(500).json(error.message);
    }
};

const deleteCourse = async(req,res)=>{
    try{
    const {id}=req.params;
    const course = await Course.findById(id);
    if(!course){
        return res.status(404).json({message : "Course not found"});
    }
    const request_teacher_id = req.user.id;
    if(request_teacher_id != course.teacher_id){
        return res.status(400).json({message : "Not allowed to delete"});
    }
    const delete_course = await Course.deleteOne({_id : id});
    res.json({message : "Course deletion successful",delete_course});
    }catch(error){
        res.status(500).json({message : "server error"});
    }
};

module.exports = {getCourses , createCourse, updateCourse, deleteCourse};