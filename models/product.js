const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const {ObjectId} =mongoose.Schema;
const product=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,

    },
    price:{
        dryclean:{
            type:String,
            trim:true,
            required:true
        },
        washiron:{
            type:String,
            trim:true,
            required:true
        },
        ironing:{
            type:String,
            trim:true,
            required:true
        }
    },
    
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength: 1000,
    },
    // stock:{
    //     type:Number,
    // },
    // sold:{
    //     type:Number,
    //     default:0
    // },
    photo:{
        data:Buffer,
        defaultType:String
    }
},{timestamps:true})

module.exports=mongoose.model("Product", product)