const Category = require('../models/categoryModel')

// exports.addCategory = (request, response) =>{
//     Category.create({
//         category_name: request.body.category_name
//     })
//     .then(category_new=>{
//         if(!category_new){
//             return response.status(400).json({error: "Something went wrong"})
//         }
//         response.send(category_new)
//     })
//     .catch(error=>{
//         return response.status(500).json(error)
//     })
// }

exports.addCategory = async (req, res) => {

    let categoryExists = await Category.findOne({ category_name: req.body.category_name })
    if (categoryExists) {
        return res.status(400).json({ error: "Category already exists" })
    }

    let categoryToAdd = await Category.create({
        category_name: req.body.category_name
    })
    if (!categoryToAdd) {
        return response.status(400).json({ error: "Something went wrong" })
    }
    res.send(categoryToAdd)
}


exports.getAllCategory = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categories)
}

exports.getCategoryDetails = async (req, res) => {
    const id = req.params.id || req.query.id
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}

exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })
    if (!categoryToUpdate) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categoryToUpdate)
}

exports.deleteCategory = async (req, res) => {
    let deletedCategory = await Category.findByIdAndDelete(req.params.id)
    if (!deletedCategory) {
        return res.status(400).json({ error: 'Category not found' })
    }
    res.send({ message: 'Category deleted successfully' })

}

/*
CRUD
C - Create : Model.create({obj})
R - Read : Model.find() : gets all data from database
           Model.find(fliterObj) : gets all data from database that satisfies the filterObj
           Model.findOne(fliterObj): gets first datd from database that satisfies the filterObj
           Model.findOne() ; returns first data from database
           Model.findOne(id) : returns data with provided data
U - Update : Model.findByIdAndUpdate(id, UpdateObj, options) -
             updates data with given id, UpdatingObj provides the field and values for update option - {new: true} - returns updates value
D - Delete : Model.findByIdAndDelete(id) - removes data from database with the given id


404 - Not Found Error
400 - Bad Request
500 - Server Error
200 - OK(default/success)
*/

