const ProductModel = require('../models/productModel')
const fs = require('fs')


// add new product
exports.addProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File is Required" })
    }
    let productToAdd = new ProductModel({
        product_title: req.body.product_title,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        product_image: req.file?.path
    })

    productToAdd = await productToAdd.save()
    if (!productToAdd) {
        return res.status(400).json({ error: 'Something went wrong' })
    }
    res.send(productToAdd)
}

exports.getAllProduct = async (req, res) => {
    let products = await ProductModel.find().populate('category', 'category_name')
    if (!products) {
        return res.status(400).json({ error: "Category already exists" })
    }
    res.send(products)
}


// get product details
exports.getProductDetails = async (req, res) => {
    const id = req.params.id || req.query.id
    let product = await ProductModel.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}


// get product by category
exports.getProductByCategory = async (req, res) => {
    let product_by_category = await ProductModel.find({ category: req.params.categoryId })
    if (!product_by_category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product_by_category)
}

// update product
exports.updateProduct = async (req, res) => {
    let productToUpdate = await ProductModel.findById(req.params.id)
    if (!productToUpdate) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    if (req.file) {
        if (productToUpdate.product_image) {
            fs.unlinkSync(productToUpdate.product_image)
        }

        productToUpdate.product_image = req.file.path
    }

    let { product_title, product_price, product_description, count_in_stock, category, rating } = req.body

    productToUpdate.product_title = product_title ? product_title : productToUpdate.product_title
    productToUpdate.product_price = product_price ? product_price : productToUpdate.product_price
    productToUpdate.product_description = product_description ? product_description : productToUpdate.product_description
    productToUpdate.count_in_stock = count_in_stock ? count_in_stock : productToUpdate.count_in_stock
    productToUpdate.category = category ? category : productToUpdate.category
    productToUpdate.rating = rating ? rating : productToUpdate.rating

    productToUpdate = await productToUpdate.save()

    if (!productToUpdate) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(productToUpdate)
}

// delete
exports.deleteProduct = (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(400).json({ error: 'Something went wrong' })
            }
            else {
                fs.unlinkSync(deletedProduct.product_image)
                res.send({ message: "Product deleted successfully" })
            }
        })
        .catch(error => res.status(500).send(error))
}

// filter product
exports.filterProduct = async(req, res) => {
    // {category:[], product_price:[]}
    let filter = req.body
    let filterArgs = {}
    for(var key in filter){
        if(filter[key].length > 0 ){

            if(key === 'category'){
                filterArgs[key] = filter[key]
            }
            else{
                filterArgs[key] ={
                    $lte : filter[key][1],
                    $gte : filter[key][0]
    
                }
            }
        }
    }


    let products = await ProductModel.find(filterArgs)
    if(!products){
        return res.status(400).json({error: "Something Went Wrong"})
    }
    res.send(products)
}

// related product
exports.getRelatedProducts = async(req, res) =>{
    let product = await ProductModel.findById(req.params.id)
    let products = await ProductModel.find({
        category: product.category,
        _id: {$ne: product._id}
    })

    if(!products){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(products)
}