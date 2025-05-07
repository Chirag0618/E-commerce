// import express from 'express'
// import router from './routes/testRoutes.js'
// import connection from './database/connection.js'
// import dotenv from 'dotenv'
// import categoryRouter from './routes/categoryRoutes.js'
const express = require('express')
require('dotenv').config()
require('./database/connection')
const cors = require('cors')


const app = express()
// connection
// dotenv.config()

const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoute')
const UserRouter = require('./routes/userRoutes')
const OrderRouter = require('./routes/orderRoutes')
const PaymentRoutes = require('./routes/paymentRoute')


const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


// app.use(router)
app.use(categoryRouter)
app.use(productRouter)
app.use(UserRouter)
app.use(OrderRouter)
app.use(PaymentRoutes)


app.use('/public/uploads', express.static('public/uploads'))



app.listen(5000, () => {
    console.log(`App Started Successfully at port ${port}.`)
})