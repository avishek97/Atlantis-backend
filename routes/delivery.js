const express=require('express')
const { deliverySignup, deliverySignin, isSignedIn, isAthenticated } = require('../controllers/auth')
const { check } = require('express-validator');
const { getDeliveryBoyId, test } = require('../controllers/delivery');
const router=express.Router()

router.param("deliveryBoyId",getDeliveryBoyId)
router.post('/delivery/signup',[
    check('password',"Pasword should be more than 8 character long").isLength({min:8}),
    check('email',"Email is invalid").isEmail()
], deliverySignup)
router.post('/delivery/signin',[
    check('email','please provide your email').isEmail(),
    check('password','password should be min 8 character long').isLength({min:8})
],deliverySignin)
router.get('/delivery/test/:deliveryBoyId',isSignedIn,isAthenticated,test)
module.exports=router