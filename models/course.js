const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "title is required"],
        trim : true
    },
    price : {
        type : Number,
        required : [true, "price is required"],
        min : [0 , "price can't be negative"],
        max : [Number.MAX_SAFE_INTEGER,"Price is too big"]
    },
    teacher_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description : {
        type : String,
        minLength : [10, "too short, make it's length greater than 10"],
        maxLength : [200, "too long, make it's length less than 200"]
    }, 
    duration : {
        type : String,
        default : "2 hour daily"
    },
    weekly_class: {
        type : Number,
        default : 3,
        min : [1,'weekly class must be greater than 1']
    },
    level : {
        type : Number,
        enum : {
            values : [9,10,11,12],
            message : '{VALUE} is not valid level'
        },
        required : [true, 'please enter a level']
    },
    language : {
        type : String,
        enum : {
            values : ['Bangla', 'English'],
            message : '{VALUE} is not a valid language',
        },
        default : "Bangla"
    },
    started_date : {
        type : [Date,'enter valid date.format : yyyy-mm-dd'],
        required : [true, 'started date is required'] ,
        validate : {
            validator : function(val){
            if(val>Date.now()){
                return val
            }
            message : "Date must be in future"
        }
    }
    },
    max_seat : {
        type : Number,
        min : [1, 'seat number must be greater or equal 1'],
        required : [true, 'max seat needed']
    },
    total_enrolled : {
        type : Number,
        default : 0
    },
},
    {timestaps : true}
);

module.exports = mongoose.model("Course", courseSchema);
