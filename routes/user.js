const express=require('express')
const router = express.Router()
const { isSignedIn, isAthenticated }=require('../controllers/auth')
const {getUserById,getUser, updateUser, userPurchaseList}=require('../controllers/user')
router.param("userId",getUserById)
router.get('/user/:userId',isSignedIn,isAthenticated,getUser)
router.put('/user/:userId',isSignedIn,isAthenticated,updateUser)
router.get('/order/user/:userId',isSignedIn,isAthenticated,userPurchaseList)
module.exports=router