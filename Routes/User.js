
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const {usermodel,purchasemodel,coursemodel} = require("../db")
const mongoose  = require("mongoose") 
const{auth} = require("../auth")

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET


router.use(express.json())

//Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course
//Add routes for admin login, admin signup, create a course, delete a course, add course content.

router.post("/signup", async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    if (!username || !email || !password) {
         return res.status(400).send({
            msg: "Please fill out all the valid places"
        })
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    try {
        console.log(username,email,hasedPassword);
        const newuser = await usermodel.create({
            username: username,
            email: email,
            password: hasedPassword
        })
      
        res.status(200).send({
            msg:"The user has signed up"
        })
    }catch(e){
        console.log(e);  
        res.status(408).send({
            msg:"Error while connecting to database"
        })
    }
    
})


router.post("/login",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    if(!email||!password){
        res.status(400).send({
            msg:"Pls fill out the empty field"
        })
    }
    try{
        const founduser = await usermodel.findOne({
            email:email
        })
        if(!founduser){
            res.status(403).send({
                msg:"Wrong credential"
            })
        }
        const foundpass = await bcrypt.compare(password,founduser.password)
        if(foundpass){
            const token = jwt.sign({
                id:founduser._id.toString()
            },JWT_SECRET)
            res.status(200).send({
                msg:token
            })
        }else{
            res.status(403).send({
                msg:"Wrong credential"
            })
        }
    }catch(e){
        res.status(403).send({
            msg:"Wrong credential"
        })
    }
})

router.get("/purchases",auth,async(req,res)=>{
    const userid = req.userId
    console.log(userid);
    let courseList = []
    try{
    const purchases = await purchasemodel.find({
        userId:userid
    })
    console.log(purchases);
    purchases.forEach((e)=>{
        courseList.push(e.coursename)
    })
    res.status(200).json({
        courseList:courseList
    })
    }catch(e){
        console.log(e);
        res.status(403).send({
            msg:"You are not a user"
        })
    }
    
})


router.get("/allcourses",auth,async(req,res)=>{
    try{
        const courses = await coursemodel.find()
        res.status(200).json({
            courses
        })
    }catch(e){
        console.log(e);
        res.status(408).send({
            msg:"Error while connecting to DB"
        })
    }
})

router.post("/purchase",auth,async(req,res)=>{
    const userId = req.userId
    const {coursename,courseid} = req.body
    if(!coursename){
        return res.status(400).send({
            msg:"A course name is required"
        })
    }
    try{
        await purchasemodel.create({
            userId:userId,
            coursename:coursename,
            courseid:courseid
        })
        res.status(200).send({
            msg:"Your course has been purchased"
        })
    }catch(e){
        console.log(e);
        res.status(408).send({
            msg:"Connection error"
        })
    }
})



module.exports = router