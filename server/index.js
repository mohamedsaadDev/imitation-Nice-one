const express = require('express')
require('dotenv').config()
const cors = require('cors')
const httpStatusText = require('./utils/httpStatusTexr')
const app = express()
const path = require('path')
const allowedOrigins = [
    process.env.DOMAIN_CLIENT,
    process.env.DASHBORD,
    ];
app.use(cors({origin:allowedOrigins}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//start connect database 
const connectDB = require('./config/dbconn')
connectDB()
//end connect database
//static file
app.use(express.static(path.join(__dirname, "data")))
app.use(express.json())
const userRouter = require("./routes/userrout")
const productRouter = require("./routes/productrout")
const orderRouter = require("./routes/orderRout")
app.use('/api/users/',userRouter)
app.use('/api/products/',productRouter)
app.use('/api/orders/',orderRouter)
app.all('*',(req,res,next)=>{
    res.status(404).json({status: httpStatusText.ERROR,messag:'this resource is not a valid'})
})
app.listen(process.env.PORT||5000, ()=>{
    console.log(' server run listening on port 5000')
})
