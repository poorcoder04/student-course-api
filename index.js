const express = require("express");//import express from node modules
const cors = require('cors');
require('dotenv').config();

const connecDB = require('./config/db');//import connection function from config
connecDB();

const app = express();
app.use(cors());
const paymentRoute = require('./routes/paymentRoute');
app.use('/enroll/payment',paymentRoute);

app.use(express.urlencoded({ extended: true }));
// middleware to read JSON
app.use(express.json());
//use routes

const courseRoute = require("./routes/courseRoute");
const userRoute = require('./routes/userRoute');
const enrollRoute = require('./routes/enrollRoute');
const mycourseRoute = require('./routes/mycourseRoute');

app.use('/courses',courseRoute);
app.use('/user',userRoute);
app.use('/enroll',enrollRoute);
app.use('/mycourse',mycourseRoute);
// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});