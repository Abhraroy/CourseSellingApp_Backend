const jwt = require("jsonwebtoken")
const JWT_SECRET_ADMIN = "ADMIN"


const adminauth = (req,res,next)=>{
    const admintoken = req.headers.admintoken
    if(admintoken){
        const decoded = jwt.verify(admintoken,JWT_SECRET_ADMIN)
    }
    if(decoded){
        req.adminid = decoded.adminid
        next()
    }else{
        res.status(403).send("Wrong credential")
    }
}
module.exports = {
    adminauth
}