const mongoose = require("mongoose")
const crypto = require('crypto');
// const uuidv1= require('uuid/v1');
const { v1: uuidv1 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';
// import { v1 as uuidv1 } from 'uuid';
// const Schema= mongoose.Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:String,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    },
    purchases:{
        type:Array,
        default:[]
    },
    points:{
        type:Number,
        default:0
    }
},{timestamps:true})

userSchema.virtual("password")
    .set(function(password){
        this._password=password //  _ is use to make the variable private.
        this.salt=uuidv1();
        this.encry_password=this.securePassword(password);

    })
    .get(function(){
        return this._password
    })

userSchema.methods={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}



module.exports = mongoose.model("User", userSchema)