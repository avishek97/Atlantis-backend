const express=require('express')
const router=express.Router()

const {isSignedIn,isAthenticated,isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory}=require('../controllers/category')
// params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById)
// routes
router.post('/category/create/:userId',isSignedIn,isAthenticated,isAdmin,createCategory)
router.get('/category/:categoryId',getCategory)
router.get('/categories',getAllCategory)
router.put('/category/:categoryId/:userId',isSignedIn,isAthenticated,isAdmin,updateCategory)
router.delete('/category/:categoryId/:userId',isSignedIn,isAthenticated,isAdmin,removeCategory)
module.exports=router;