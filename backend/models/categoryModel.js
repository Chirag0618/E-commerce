const mongoose =require('mongoose')
// import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    //_id defaulted by mongodb, type ObjectId - 24bit hex string

    category_name: {
        type: String,
        required: true,
        trim: true,
    }
},{timestamps: true})
// timestamps  -> provides createdAt, updatedAt by default

// export const Category = mongoose.model("Category", categorySchema)

module.exports = mongoose.model("Category", categorySchema)