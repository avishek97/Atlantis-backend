const Category=require('../models/category')

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No category found"
            })
        }
        
        req.category=category

        next()
    })
}

exports.createCategory=(req,res)=>{
    const category = new Category(req.body)
    category.save((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Category cannot be Set"
            })
        }
        res.status(200).json({cate})
    })
}

exports.getCategory=(req,res)=>{
   return res.json(req.category)
}
exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Error in fetching the category"
            })
        }
        res.json(cate)
    })
}

exports.updateCategory=(req,res)=>{
    // if(req.profile.role===0 || req.profile.role===1)
    // {
    //     return res.status(400).json({
    //         err:"You dont have allowed to update"
    //     })
    // }
    // Category.find(
    //     {_id:req.category._id},
    //     {$set:req.body},
    //     {new:true},
    //     (err,cate)=>{
    //         if(err)
    //         {
    //             return res.status(400).json({
    //                 err:`Cannot update the category ${err}`
    //             })
    //         }
    //         res.json(cate)
    //     }
    // )
        const category =req.category
        category.name=req.body.name
        category.save((err,updatedCategory)=>{
            if(err)
            {
                return res.status.json({
                    err:"Category is not updated"
                })
            }
            res.json(updatedCategory)
        })
}

exports.removeCategory=(req,res)=>{
    const category= req.category
    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Failed to delete category"
            })
        }
        res.json({
            message:"Category Deleted Successfully"
        })
    })
}