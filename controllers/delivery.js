const Delivery = require("../models/delivery")


exports.getDeliveryBoyId=(req,res,next,id)=>{
    Delivery.findById(id).exec((err,profile)=>{
        if(err)
        {
            return res.status(400).json({
                err:"User not Found"
            })
        }
        req.delivery=profile;
        next()
    })
}

exports.test=(req,res)=>{
    res.send({mess:"okk"})
}