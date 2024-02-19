const express = require('express')
const router = express.Router()
const veryfiytoken = require('../middleware/veryfiytoken')
const  allowedTo = require('../middleware/allowedTo')
const productsControllers = require("../controllers/productControllers")
const userRoles = require('../utils/usersRole')
//start multer
const path = require('path')
const multer =require('multer')
const storgeimge = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../data"))
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage:storgeimge,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
    
})
router.route('/')
    .get(productsControllers.getAllprodects)
    .post(veryfiytoken,allowedTo(userRoles.MANGER),upload.fields([
        { name: 'imgbrand', maxCount: 1 },
        { name: 'img1', maxCount: 1 },
        { name: 'img2', maxCount: 1 },
        { name: 'img3', maxCount: 1 },
    ]), productsControllers.addprodect);
router.route('/:courseId')
    .get(productsControllers.getprodect)
    .patch(productsControllers.updetprodect)
    .delete(veryfiytoken, allowedTo(userRoles.ADMIN,userRoles.MANGER),productsControllers.deletprodect)  
module.exports= router