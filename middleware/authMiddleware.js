require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//each request has header->authorization field.Authorization look like : Bearer Token
const verifyToken = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        token=req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch(error){
        res.status(401).json({message : error.message});
        }
    }
    if(!token){
        res.status(401).json({message : "Not authorized, no token"});
    }
};

const teachersOnly = (req,res,next)=>{
        if(req.user && req.user.role ==='teacher'){
            next();
        }
        else{
            res.status(403).json({message : "Not allowed, Only for tecachers"});
        }
};

const studentOnly = (req,res,next)=>{
    if(req.user && req.user.role === 'student'){
        next();
    }
    else{
        res.status(403).json({message :"Not allowed, Only for students"});
    }
}

module.exports={verifyToken,teachersOnly,studentOnly};