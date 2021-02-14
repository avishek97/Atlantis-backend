var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Delivery = require('../models/delivery')

exports.signin=(req,res)=>{
   const {email, password}=req.body;
   const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }
    
    User.findOne({email},(err,user)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Email not found"
            })
        }
        if(!user.authenticate(password))
        {
            return res.status(400).json({
                error:"Email and password is invalid."
            })
        }
        // created the token
        const token =jwt.sign({_id:user._id},process.env.SECRET)
        // created the cookie
        res.cookie("token",token)
        // sending details to frontend
        const {_id,name,email,role,points,purchases,cart} = user;
        res.json({
           token,user:{_id,name,email,role,points,purchases,cart}
        })
    })
}

exports.signup=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }
    const user=new User(req.body)
    user.save((err,user)=>{

        if(err)
        {
            return res.status(400).json({
                err:"Failed in saving data in DB"
            })
        }
        res.status(200).json(user)
    })
   
}

exports.signout=(req,res)=>{
    res.clearCookie("token")
    res.json({msg:"You are signout"})
}

// protected route

exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    algorithms:["HS256"],
    userProperty:"auth"

})

// exports.isSignedIn=expressJwt(secret:process.env.SECRET,{
//     "alg": "HS256",
//     "typ": "JWT"
//   })

// custom middlewares

exports.isAthenticated =(req,res,next)=>{
    let checker= req.profile && req.auth && req.auth._id==req.profile._id
    if(!checker)
    {
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin =(req,res,next)=>{
    if(req.profile.role===0 || req.profile.role===1)
    {
        return res.status(403).json({
            error:"You are not ADMIN"
        })
    }
    next()
}

exports.deliverySignup=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            err:errors.array()[0].msg
        })
    }
    const deliverySignup=new Delivery(req.body)
    deliverySignup.save((err,details)=>{
        if(err)
        {
            return res.status(400).json({
                err:err
            })
        }
        res.json(details)
    })
}

exports.deliverySignin=(req,res)=>{
    const {password,name,lastname,items,email,_id}=req.body

Delivery.findOne({email:email},(err,delivery)=>{
    
    if(err)
    {
        return res.status(400).json({
            err:"Email is not found"
        })
    }
    if(!delivery.authentication(password))
    {
        return res.status(400).json({
            err:"Email and password not match"
        })
    }
    const {name,lastname,items,email,_id}=delivery

    const token=jwt.sign({_id:_id},process.env.SECRET)
    res.cookie("token",token)
    res.json({
        token,user:{name,lastname,items,email,_id}
    })
})
}