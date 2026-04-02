const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const userRegistration = async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const userExists =await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already Registerd"});
        }
        const user = new User({name,email,password,role});
        await user.save();
        res.status(200).json({
            _id : user._id,
            name : user.name,
            token : generateToken(user._id),
            message : "registration successful",
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message : error.message});
    }
};

const userLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                _id : user._id,
                role : user.role,
                token : generateToken(user._id),
                message : "login successful",
            })
        }
        else{
            res.status(401).json({message : "Invalid email or password"});
        }
    }catch(error){
        res.status(500).json({message :"server error"});
    }
};

module.exports ={userRegistration,userLogin};