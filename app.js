
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const mongoose  = require("mongoose")
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
mongoose.connect("mongodb+srv://abhra_mongo03:abhra_mongo03@cluster0.gdlv3.mongodb.net/Course_Selling_App").then(()=>{
    console.log("Connected");
})
const app = express()
app.use(express.json())

//Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course
//Add routes for admin login, admin signup, create a course, delete a course, add course content.


const userRoutes = require("./Routes/User");
const adminRoutes = require("./Routes/Admin");

app.use("/user", userRoutes); 
app.use("/admin", adminRoutes); 






app.listen(PORT,()=>{
    console.log(`Your server is running on ${PORT}`);
    
})