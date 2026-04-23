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
        const {id}=req.params;//get id from url
        const{title, price}=req.body;

        const course = await Course.findByIdAndUpdate(
            id,
            {title, price},
            {new : true}
        );
        if(!course){
            return res.status(404).json({message : "Course not found"});
        }
        res.json(course);
    }catch(error){
        res.status(500).json({message : "server error"});
    }
};

const deleteCourse = async(req,res)=>{
    try{
    const {id}=req.params;
    const course = await Course.findByIdAndDelete(id);
    if(!course){
        return res.status(404).json({message : "Course not found"});
    }
    res.json(course);
    }catch(error){
        res.status(500).json({message : "server error"});
    }
};

module.exports = {getCourses , createCourse, updateCourse, deleteCourse};