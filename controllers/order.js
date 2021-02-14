const {Order,ProductCartSchema} = require('../models/order')
const User = require('../models/user')

exports.getOrderById=(req,res,next,id)=>{
   Order.findById(id)
   .populate("products.product","name price")
   .exec((err,order)=>{
       if(err)
       {
           return res.status(400).json({
               err:"No order found"
           })
       }
       req.order=order;
       next()
   })
}

exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile
    

    req.body.order.products=req.profile.cart
    const order=new Order(req.body.order)
    order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:err
            })
        }
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
                
                // res.json(purchase)
                
            }
            
            )
            User.findOneAndUpdate(
                {_id:req.profile._id},
                {$set:{cart:[]}}, //filed user purchase with local purchase array
                {new:true,useFindAndModify:false},
                (err,purchase)=>{
                    if(err)
                    {
                        return res.status(400).json({
                            err:"Unable to save the purchase list"
                        })
                    }
                    
                    // res.json(purchase)
                    
                }
                
                )
        res.json(order)
    })
    
    // const order = new Order()
    // order.save((err,order)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({
    //             err:"Failed to create order"
    //         })
    //     }
    // })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name email")
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"NO orders found yet!"
            })
        }
        res.json(order)
    })
}
exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}
exports.updateStatus=(req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,status)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"Cannot update the order status"
                })
            }
            res.json(order)
        }
    )
}

// exports.addToCart=(req,res)=>{
//     const cart=new ProductCartSchema()
    
// }

exports.deleteOrder=(req,res)=>{
    const ord=req.order
    ord.remove((err,deleteOrd)=>{
        if(err)
        {
            return res.status.json({
                err:"failed to delete product"
            })
        }
        res.json(deleteOrd)
    })

}

exports.editCart=(req,res)=>{
    const cart=req.profile.cart
    var ind;
    cart.map(item=>{
        if(item._id==req.product._id)
        {
            ind=cart.indexOf(item)
        }
    })
    cart.splice(ind,1)
    res.json(cart)
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set:{cart:cart}}, //filed user purchase with local purchase array
        {new:true,useFindAndModify:false},
        (err,purchase)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"Unable to save the purchase list"
                })
            }
            
            // res.json(purchase)
            
        }
        
        )
}

exports.assignedToDelivery=(req,res)=>{
    
}