const mongoose= require('mongoose');
const {ObjectId}=mongoose.Schema
const Schema =mongoose.Schema

const ProductCartSchema = new Schema({
    // product:{
    //     type:ObjectId,
    //     ref:"Product"
    // },
    // name:{
    //     type:String,
    //     trim:true
    // },
    

    product:{
        type:Array,
        default:[]
    },
    count:Number,
    price:Number
})

const ProductCart = mongoose.model("ProductCart", ProductCartSchema)

const orderSchema = new Schema({
    // products:[ProductCartSchema],
    products:{
        type:Array,
        default:[]
    },
    transaction_id:{},
    amount:{type:Number},
    address:{type:String},
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Received","Processing","Shipping"]
    },
    collection_date:String,
    Delivery_on:String,
    Notes:String,
    update:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
    
},{timestamps:true})

const Order = mongoose.model("Order", orderSchema)

module.exports={Order,ProductCart}