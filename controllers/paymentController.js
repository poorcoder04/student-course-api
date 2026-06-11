const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

const createCheckoutSession = async (req,res)=>{
    const {courseId} = req.body;
    try{
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({message : "Course not found"});
        }

        const existingEnrollment = await Enrollment.findOne({
            course_id : courseId,
            user_id : req.user.id
        });
        if(existingEnrollment){
            return res.status(400).json({message : "Student already enrolled in this course"});
        }

        if(course.total_enrolled >= course.max_seat){
            return res.status(400).json({message : "Course is full"});
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            mode : 'payment',
            success_url : `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `http://localhost:3000/cancel`,
            line_items : [{
                price_data: {
                    currency : 'usd',
                    product_data : {name : course.title},
                    unit_amount : course.price * 100,
                },
                quantity : 1,
            }],
            metadata: {
                course_id : course._id.toString(),
                user_id : req.user.id.toString()
            }
        });
        res.json({url: session.url});
    } catch(error){
        res.status(500).json({error : error.message});
    }
};

module.exports = {
    createCheckoutSession
};
