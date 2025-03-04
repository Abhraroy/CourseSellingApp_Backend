const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const JWT_SECRET_ADMIN = "ADMIN"
const {adminmodel,coursemodel} = require("../db")
const { adminauth } = require("../admin_auth")



router.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).send({
            msg:"Please enter email and password to login as admin"
        })
    }
    try{
        await adminmodel.create({
            email:email,
            password:password
        })
        res.status(200).send({
            msg:"Signup as admin is successful"
        })

    }catch(e){
        console.log(e);  
        res.status(408).send({
            msg:"Error while connecting to database"
        })
    }
})


router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400).send({
            msg:"Please enter email and password to login as admin"
        })
    }
    try{
        const foundadmin = await adminmodel.findOne({
            email:email,
            password:password
        })
        if(foundadmin){
        const admin_token = jwt.sign({
            adminid:foundadmin._id.toString()
        },JWT_SECRET_ADMIN)
        res.status(200).send({
            admintoken:admin_token
        })
        }else{
            res.status(403).send({
                msg:"Wrong credential"
            })
        }
    }catch(e){
        console.log(e);
        res.status(403).send({
            msg:"Wrong credential"
        })    
    }
})

router.post("/createcourse",adminauth,async(req,res)=>{
    const {course,price} = req.body
    if (!course || !price) {
        return res.status(400).send({
           msg: "Please fill out all the valid places"
       })
   }
   try{
    await coursemodel.create({
        course:course,
        price:price
    })
    res.status(200).send({
        msg:"The course has been added"
    })
   }catch(e){
    res.status(408).send({
        msg:"Error while connecting to db"
    })
   }
})

module.exports = router