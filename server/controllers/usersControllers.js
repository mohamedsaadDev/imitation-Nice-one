const User =require('../models/user.model'); 
const generateJWT = require('../utils/generateJWT');
const httpStatusText = require('../utils/httpStatusTexr')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getAllusers = async (req,res)=>{
    //console.log(req.headers)
    const query = req.query
    const limit = query.limit || 25
    const page = query.page || 1
    const skip = (page- 1) * limit;
    const users = await User.find({},{"__v":false,"password":false,"token":false}).limit(limit).skip(skip)
    res.status(200).json({status: httpStatusText.SUCCESS,data:{users}})
}
const deletUser = async (req, res) => {
    const userId = req.params.userId
    console.log(userId)
    const deletuser = await User.deleteOne({_id: userId})
    res.status(200).json({status:httpStatusText.SUCCESS,data: deletuser})
}
const register = async (req, res) => {
    try {
        const { firstName, LastName, email, password } = req.body;
        if (!firstName || !LastName || !email || !password) {
            return res.status(400).json({ status: httpStatusText.ERROR, message: "Please provide all required fields" });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(403).json({ status: httpStatusText.ERROR, message: "User with this email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            LastName,
            email,
            password: hashedPassword,
        });
        const token = await generateJWT({ email: newUser.email, id: newUser._id });
        newUser.token = token;
        await newUser.save();
        res.status(200).json({ status: httpStatusText.SUCCESS, data: newUser });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ status: httpStatusText.ERROR, message: "Internal Server Error" });
    }
};
const login = async (req,res)=>{
    const {email, password} = req.body
    if(!email && !password){
        return res.status(400).json({status:httpStatusText.ERROR,mesage:"email and password are required"})
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({status:httpStatusText.ERROR, mesage:"email not found"})
    }
    const matchedpassword = await bcrypt.compare(password,user.password)
    if(user && matchedpassword){
        const token = await generateJWT({ email: user.email,id:user._id,role:user.role })
        return res.status(200).json({status: httpStatusText.SUCCESS,
            data:{token,email,id:user._id,role:user.role,registrationTime:user.registrationTime}})
    }else {
        return res.status(500).json({status: httpStatusText.ERROR, mesage:"something wrong"})
    }
}
module.exports ={
    getAllusers, 
    register,   
    login,
    deletUser,
}
