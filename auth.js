const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET





const auth = (req,res,next)=>{
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_SECRET)
    if(decoded){
        req.userId = decoded.id
        next()
    }else{
        res.status(403).send({
            msg:"You are not a user"
        })
    }

}

module.exports={
    auth
}