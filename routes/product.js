const express=require('express')
const router=express.Router()
const {isSignedIn,isAthenticated,isAdmin}=require('../controllers/auth')
const {getProductById,createProduct, photo,getProduct,deleteProduct,updateProduct, getAllProducts}=require('../controllers/product')
const {getUserById}=require('../controllers/user')
router.param("userId",getUserById)
router.param("productId",getProductById)
router.post('/product/create/:userId',isSignedIn,isAthenticated,isAdmin,createProduct)
router.get('/product/:productId',getProduct)    
// router.get('/product/photo/:productId',photo)
router.delete('/product/:productId/:userId',isSignedIn,isAthenticated,isAdmin,deleteProduct)
router.put('/product/:productId/:userId',isSignedIn,isAthenticated,isAdmin,updateProduct)
router.get('/products',getAllProducts)
module.exports=router 