const Prodect = require('../models/prodect.model')
const httpStatusText = require('../utils/httpStatusTexr')
const getAllprodects = async (req, res)=>{  
    const query = req.query
    const limit = query.limit || 25
    const page = query.page || 1
    const skip = (page- 1) * limit;
    const prodects = await Prodect.find({},{"__v":false}).limit(limit).skip(skip)
    res.status(200).json({status: httpStatusText.SUCCESS,data:{prodects}})
}
const getprodect = async (req, res)=>{ 
    try{
        const prodect = await Prodect.findById(req.params.ProdectId)
        if(!prodect){
            return res.status(404).json({status:httpStatusText.FAIL,data:{prodect:"Course Not Found"}})
        }
        return res.status(200).json({status:httpStatusText.SUCCESS,data:{prodect}})
    }catch(err){
        return res.status(400).json({status:httpStatusText.ERROR,data:null , message:err.message,code:400})
    }
}
const addprodect = async (req, res)=>{
    const { imgbrand, img1, img2, img3 } = req.files
    const productPreparation = {
        ...req.body,
        imgbrand: imgbrand[0].originalname,
        img1:img1[0].originalname,
        img2:img2[0].originalname,
        img3:img3[0].originalname,
    }
    console.log(productPreparation)
    const newProdect = new Prodect(productPreparation)
    const newprodectss = req.body
    if(!req.body.title ){
        console.log('title is none',req.body )
        return res.status(404).json({status:httpStatusText.FAIL, msg:"title is required"})
    }
    if (!req.body.price){
    res.status(404).json({message:"price is required"})
    }
    await newProdect.save()
    console.log('new product is save',newProdect)
    res.status(201).json({status:httpStatusText.SUCCESS,data:{newProdect}})
}
const updetprodect = async (req, res)=>{
    try{
        const prodectId = req.params.ProdectId
        const updetprodect = await Prodect.updateOne({_id:prodectId}, {...req.body})
        return res.status(200).json({status:httpStatusText.SUCCESS,data:{prodect:updetprodect}})
    }catch(err){
        return res.status(400).json({status:httpStatusText.ERROR,masg:err.message})
    }
}
const deletprodect = async (req, res)=>{
    const prodectId = req.params.ProdectId
    const deletprodect = await Prodect.deleteOne({_id: prodectId})
    res.status(200).json({status:httpStatusText.SUCCESS,data: deletprodect})
}
module.exports ={ 
    getAllprodects,
    getprodect,
    addprodect,
    updetprodect,
    deletprodect
}
