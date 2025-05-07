// import express from "express";
// import { addCategory } from "../controllers/categoryController.js";
const express = require('express')
const { addCategory, getAllCategory, getCategoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
// const addCategory = require('../controllers/categoryController')
const { categoryRules, validationMethod, categoryUpdateRules } = require('../middleware/validationScript')
const { requireLogin, requireAdmin } = require('../controllers/userController')

const router = express.Router()

router.post('/addcategory',requireAdmin, categoryRules, validationMethod, addCategory)
router.get('/getallcategories', getAllCategory)
router.get('/getcategorydetails/:id', getCategoryDetails)
router.get('/getcategorydetails', getCategoryDetails)
router.put('/updatecategory/:id',requireAdmin, categoryUpdateRules, validationMethod, updateCategory)

router.delete('/deletecategory/:id',requireAdmin, deleteCategory)

// export default router
module.exports = router 