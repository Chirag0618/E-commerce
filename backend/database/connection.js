// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log(`DATABASE CONNECTED SUCCESSFULLY`)

})
.catch(error=>{
    console.log(error)
})

// export default mongoose