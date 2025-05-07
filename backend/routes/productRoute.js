const { addProduct, getAllProduct, getProductDetails, getProductByCategory, updateProduct, deleteProduct, filterProduct, getRelatedProduct, getRelatedProducts } = require('../controllers/productController')
const { requireAdmin } = require('../controllers/userController')
const { upload } = require('../middleware/fileUpload')
const { productRules, validationMethod } = require('../middleware/validationScript')
const router = require('express').Router()

router.post('/addproduct',requireAdmin, upload.single('product_image'),productRules, validationMethod,addProduct)

router.get('/getallproducts', getAllProduct)

router.post('/getallproducts', filterProduct)

router.get('/getproductdetails/:id', getProductDetails)
router.get('/getproductdetails', getProductDetails)
router.get('/getproductbycategory/:categoryId', getProductByCategory)
router.put('/updateproduct/:id',requireAdmin, upload.single('product_image'), updateProduct )
router.delete('/deleteproduct/:id',requireAdmin, deleteProduct)

router.get('/getrelatedproducts/:id', getRelatedProducts)

module.exports = router