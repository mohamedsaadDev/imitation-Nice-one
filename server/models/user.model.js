const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/usersRole')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:[validator.isEmail,'filed must be a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN, userRoles.USER, userRoles.MANGER],
        default:userRoles.USER
    },
    registrationTime: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User',userSchema )