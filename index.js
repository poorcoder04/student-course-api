const express = require("express");//import express from node modules
const connecDB = require('./config/db');//import connection function from config
const courseRoute = require("./routes/courseRoute");
const userRoute = require('./routes/userRoute');
const enrollRoute = require('./routes/enrollRoute');
const mycourseRoute = require('./routes/mycourseRoute');
const app = express();

connecDB();
// middleware to read JSON
app.use(express.json());
//use routes

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