const jwt = require("jsonwebtoken");
const httpStatusText = require('../utils/httpStatusTexr')
const veryfiytoken = (req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        res.status(401).json({message:'token is required', stutus:httpStatusText.ERROR}) 
    }
    const token = authHeader.split(' ')[1];
    try{
        const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentUser = currentUser
        
    }catch(err){
        return res.status(401).json({message:'invalid token', stutus:httpStatusText.ERROR})
    }
    next()
}
module.exports= veryfiytoken
