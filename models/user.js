const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    role: {
        type : String,
        enum: ['student','teacher'],
        default : 'student'
    }
},
{timestamps: true}
);

//to hash the password before saving
userSchema.pre('save', async function(){
    if(!this.isModified('password'))
        return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model('User',userSchema);
module.exports=User;