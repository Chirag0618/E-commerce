const {check, validationResult} = require('express-validator')

exports.validationMethod = (req, res, next) =>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

exports.categoryRules = [
    check('category_name', 'Category Filed is Required').notEmpty()
    .isLength({min: 3}).withMessage("Category must be atleast 3 characters")
]

exports.categoryUpdateRules = [
    check('category_name').optional()
    .isLength({min: 3}).withMessage("Category must be atleast 3 characters")
]

exports.productRules = [
    check('product_title','Product Name is required').notEmpty()
        .isLength({min: 3}).withMessage("Product name must be atleast 3 characters"),
    check('product_description', 'Product description is required').notEmpty()
        .isLength({min: 20}).withMessage("Product description must be atleast 20 characters"),
    check('product_price', 'Product price is required').notEmpty()
        .isNumeric().withMessage('Product price must be a number'),
    check('count_in_stock', 'Count in Stock  is required').notEmpty()
        .isNumeric().withMessage('Count in Stock must be a number'),
    check('category', 'Category is required').notEmpty()
        .isMongoId().withMessage('Invalid Category ID'),
]

exports.userRules = [
    check('username', "Username is required").notEmpty()
        .isLength({min: 3}).withMessage("Username must be at least 3 characters")
        .not().isIn(['admin', 'test', 'dog', 'god']).withMessage("Username not allowed"),
    check('email',"E-mail is required").notEmpty()
        .isEmail().withMessage("Email format incorrect"),
    check('password', "Password is required").notEmpty()
        .matches(/[a-z]/).withMessage("Password must consist at least 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must consist at least 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must consist at least 1 number")
        .matches(/[!@#$%-]/).withMessage("Password must consist at least 1 special character")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters")
        .isLength({max: 20}).withMessage("Password must be less than 20 characters")
]

exports.passwordRules = [
    check('password', "Password is required").notEmpty()
        .matches(/[a-z]/).withMessage("Password must consist at least 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must consist at least 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must consist at least 1 number")
        .matches(/[!@#$%-]/).withMessage("Password must consist at least 1 special character")
        .isLength({min: 8}).withMessage("Password must be at least 8 characters")
        .isLength({max: 20}).withMessage("Password must be less than 20 characters")
]