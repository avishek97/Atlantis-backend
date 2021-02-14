const User=require('../models/user')
const Order=require('../models/order')

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(404).json({
                error:"User not Found"
            })
        }
        req.profile=user;
        next();
    })
}


exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined 
    return res.json(req.profile)
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"You are not authorized to change"
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList=(req,res)=>{
    User.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No Order in this account"
            })
        }
        res.json(order)

    })
}

exports.pushInCartList=(req,res)=>{
    let purchases=[]
    // req.body.order.products.forEach(product=>{
    //     purchases.push({
    //         _id:product._id,
    //         name:product.name,
    //         description:product.description,
    //         category:product.category,
    //         quantity:product.quantity,
    //         amount:req.body.order.amount,
    //         transaction_id:req.body.order.transaction_id 
    //     })
    // });
    purchases.push(req.product)

    // const obj={
    //     _id:req.body._id,
    //     name:req.body.name,
    //     description:req.bo
    // }



    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{cart:purchases}}, //filed user purchase with local purchase array
        {new:true,useFindAndModify:false},
        (err,cart)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"Unable to save the purchase list"
                })
            }
            // next()
            res.json(cart)
        }

    )
    // res.json(req.product)
}

exports.pushOrderInPuchaseList=(req,res)=>{
    // let purchases=[]
    // req.body.order.products.forEach(product=>{
    //     purchases.push({
    //         _id:product._id,
    //         name:product.name,
    //         description:product.description,
    //         category:product.category,
    //         quantity:product.quantity,
    //         amount:req.body.order.amount,
    //         transaction_id:req.body.order.transaction_id 
    //     })
    // });
    // purchases.push(req.product)

    // const obj={
    //     _id:req.body._id,
    //     name:req.body.name,
    //     description:req.bo
    // }



    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:req.profile.cart}}, //filed user purchase with local purchase array
        {new:true,useFindAndModify:false},
        (err,purchase)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"Unable to save the purchase list"
                })
            }
            
            res.json(purchase)
            
        }
        
        )
       
            // res.json(req.product)
}
