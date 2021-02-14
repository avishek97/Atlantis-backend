var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const {signout,signup,signin, isSignedIn}= require('../controllers/auth')
router.post('/signin',[
    check('email','please provide your email').isEmail(),
    check('password','password should be min 8 character long').isLength({min:8})
],signin)
router.post('/signup',[
    check('password',"Pasword should be more than 8 character long").isLength({min:8}),
    check('email',"Email is invalid").isEmail()
], signup)
router.get('/signout',signout)
router.get('/test',isSignedIn,(req,res)=>{res.json({msg:"hola "})})
module.exports = router