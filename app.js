require('dotenv').config()
const mongoose=require("mongoose");
const express = require('express')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
const authRoutes=require('./routes/auth')
const userRouters=require('./routes/user')
const categoryRouters=require('./routes/category')
const productRouters=require('./routes/product')
const orderRouters= require('./routes/order')
const deliveryRouters=require('./routes/delivery')
// DB CONNECTIVITY
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB IS CONNECTED!");
}).catch((err)=>{
    console.log(err);
})

// MIDDLEWARES
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use('/api',authRoutes)
app.use('/api',userRouters)
app.use('/api',categoryRouters)
app.use('/api',productRouters)
app.use('/api',orderRouters)
app.use('/api',deliveryRouters)

// PORT
const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
})