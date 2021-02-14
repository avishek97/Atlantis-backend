const Product = require('../models/product')
const User = require('../models/user')
const formidable=require('formidable')
const _ = require('lodash')
const fs=require('fs')

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No Product found"
            })
        }
        req.product=product
        next()
    })
}

exports.createProduct=(req,res)=>{
    // const product=new Product(req.body)
    // product.save((err,prod)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             err:"Cannot create Product!"
    //         })
    //     }
    //     res.json(prod)
    // })
    let form = new formidable.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file)=>{
        if(err)
        {
            return res.status(400).json("Err in file")
        }

        const {name,description,category,photo}=fields

        if(
            !name ||
            !description ||
           
            !category 

        ){
            return res.status(400).json({
                err:"Please includes all the fields"
            })
        }

        let product = new Product(fields)
        if(file.photo)
        { 
           if(file.photo.size>3000000)
            {
                return res.status(400).json({
                    err:"Size is too big!"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
            product.save((err,prod)=>{
                if(err)
                {
                    return res.status(400).json({
                        err:"Cannot create Product!"
                    })
                }
                res.json(prod)
            })
    })
}

exports.getProduct=(req,res)=>{
    // req.product.photo=undefined
    return res.json(req.product)
}

// exports.photo=(req,res,next)=>{
//     if(req.product.photo.data)
//     {
//         res.set("Content-Type",req.product.photo.contentType)
//         return res.send(req.product.photo.data)
//     }
//     next()
// }

exports.deleteProduct=(req,res)=>{
    const product=req.product;
    product.remove((err,deletePro)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Fail to delete!"
            })
        }
        res.json({
            mess:"Product deleted!",
            deletePro
        })
    })
}
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file)=>{
        if(err)
        {
            return res.status(400).json("Err in file")
        }

        

        let product = req.product
        product=_.extend(product,fields)
        if(file.photo)
        { 
           if(file.photo.size>3000000)
            {
                return res.status(400).json({
                    err:"Size is too big!"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }
            product.save((err,prod)=>{
                if(err)
                {
                    return res.status(400).json({
                        err:"Updation failed!"
                    })
                }
                res.json(prod)
            })
    })
}

exports.getAllProducts=(req,res)=>{
    Product.find()
    .populate("category")
    .exec((err,prod)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Failed to fetcht the product"
            })
        }
        res.json(prod)
    })
}

exports.updatePoints=(req,res,next)=>{
    let myOperation =req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{points:+prod.count}}
            }
        }
    })
    User.bulkWrite(myOperation,{},(err,result)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Points increment failed"
            })
        }
        next();
    })
}