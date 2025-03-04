const mongoose  = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const user = new Schema({
    username:String,
    email:String,
    password:String
})

const admin = new Schema({
    email:String,
    password:String
})




const course = new Schema({
    course:String,
    price:Number,
})
const purchases = new Schema({
    userId:ObjectId,
    course_id:ObjectId
})
const usermodel = mongoose.model("user",user)
const purchasemodel = mongoose.model("purchases",purchases)
const adminmodel = mongoose.model("Admin",admin)
const coursemodel = mongoose.model("courses",course)
module.exports={
    usermodel,
    purchasemodel,
    adminmodel,
    coursemodel
}