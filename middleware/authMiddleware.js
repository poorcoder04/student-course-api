require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//each request has header->authorization field.Authorization look like : Bearer Token
const verifyToken = async(req,res,next)=>{
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({message : 'Not authorized, no token'});
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({message : 'Not authorized, user not found'});
        }

        return next();
    } catch (error) {
        return res.status(401).json({message : error.message});
    }
};

const teachersOnly = (req,res,next)=>{
    if (req.user && req.user.role === 'teacher') {
        return next();
    }

    return res.status(403).json({message : 'Not allowed, only for teachers'});
};

const studentOnly = (req,res,next)=>{
    if (req.user && req.user.role === 'student') {
        return next();
    }

    return res.status(403).json({message : 'Not allowed, only for students'});
};

module.exports = {verifyToken, teachersOnly, studentOnly};