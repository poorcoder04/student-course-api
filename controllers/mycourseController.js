const enrollment=require('../models/enrollment');


const myCourse=async(req,res)=>{
    try{
        const user_id = req.user.id;
        const enrollCourse=await enrollment.find({user_id}).populate('course_id');
        if(enrollCourse.length===0){
            return res.status(200).json({message : "Not enrolled yet"});
        }

        const result = enrollCourse.map(e=>({
            course_id : e.course_id._id,
            title : e.course_id.title,
            price : e.course_id.price
        }));

        res.status(200).json({
            success : true,
            data : result
        });
    }catch(error){
        res.status(500).json({message : error.message});
    }
}
module.exports=myCourse;