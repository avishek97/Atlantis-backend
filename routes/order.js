const express=require('express');
const { isSignedIn, isAthenticated, isAdmin } = require('../controllers/auth');
const { getProductById, updatePoints } = require('../controllers/product');
const { getUserById, pushOrderInPuchaseList,pushInCartList } = require('../controllers/user');
const router=express.Router()
const {getOrderById, createOrder, getAllOrders,getOrderStatus,updateStatus,deleteOrder,editCart, assignedToDelivery} = require('../controllers/order');
const { getDeliveryBoyId } = require('../controllers/delivery');

router.param("orderId",getOrderById)
router.param("userId",getUserById)
router.param("productId",getProductById)
router.param('deliveryBoyId',getDeliveryBoyId)

router.post('/order/create/:userId',isSignedIn, isAthenticated,createOrder)
router.get('/order/all/:userId',isSignedIn, isAthenticated, isAdmin,getAllOrders)
router.get('/order/status/:userId',isSignedIn, isAthenticated, isAdmin,getOrderStatus)
router.put('/order/:orderId/status/:userId',isSignedIn, isAthenticated, isAdmin,updateStatus)
router.post('/cart/addToCart/:userId/:productId',isSignedIn, isAthenticated,pushInCartList)
router.delete('/order/delete/:userId/:orderId',isSignedIn,isAthenticated,deleteOrder)
// router.post('/cart/editCart/:userId/:productId',isSignedIn,isAthenticated,editCart)
router.get('/cart/deleteFromCart/:userId/:productId',isSignedIn,isAthenticated, editCart)
router.post('/order/assignedToDeliveryBoy/:orderId/:userId/:deliveryBoyId',
isSignedIn,
isAthenticated,
isAdmin,assignedToDelivery)
module.exports=router; 