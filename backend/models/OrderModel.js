const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    user:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    street_address:{
        type: String,
        required: true
    },
    alternate_street_address:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postal_code:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true, 
        default: "pending"      
    }
}, {timestamps: true})
module.exports = mongoose.model("Order", orderSchema)