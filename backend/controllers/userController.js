const UserModel = require('../models/userModel')
const TokenModel = require('../models/tokenModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const emailSender = require('../middleware/emailSender')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

// Sign Up
exports.register = async (req, res) => {
    let { username, email, password } = req.body

    // check if username is available or not
    let user = await UserModel.findOne({ username: username })
    if (user) {
        return res.status(400).json({ error: "Username not available." })
    }

    // check if email is already registered
    user = await UserModel.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "Email already registered" })
    }

    // encrypt password
    let hashed_password = await bcrypt.hash(password, 10)

    user = await UserModel.create({
        username,
        email,
        password: hashed_password
    })

    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })

    }

    let tokenObj = await TokenModel.create({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    if (!tokenObj) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    // const URL = `http://localhost:5000/verify/${tokenObj.token}`
    const URL = `${process.env.FRONTEND_URL}/verify/${tokenObj.token}`

    

    emailSender({
        from: 'noreply@something.com',
        to: email,
        subject: "Verification E-mail",
        text: `Click on the following link to activate your account ${URL}`,
        html: `<a href='${URL}'><button>Verify Now</button></a>`
    })

    res.send({ message: "User registered successfully", user })
}



exports.verifyEmail = async (req, res) => {
    // check token if token is valid or not
    let tokenObj = await TokenModel.findOne({ token: req.params.token })
    if (!tokenObj) {
        return res.status(400).json({ error: "Invalid token or token may be expired" })
    }

    // find user associated with token
    let user = await UserModel.findById(tokenObj.user)
    if (!user) {
        return res.status(400).json({ error: "User Not Found" })
    }

    // check if user is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified. Login to continue" })
    }

    // verify user
    user.isVerified = true,
        user = await user.save()

    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    // send message to user
    res.send({ message: "User Verified Successfully" })
}

// forget password
exports.forgetPassword = async (req, res) => {
    // check if email is registered or not 
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    // generate password reset token
    let tokenObj = await TokenModel.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    if (!tokenObj) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // send token to user in email
    // const URL = `http://localhost:5000/resetpassword/${tokenObj.token}`
    const URL = `${process.env.FRONTEND_URL}/resetpassword/${tokenObj.token}`

    emailSender({
        from: 'noreply@something.com',
        to: req.body.email,
        subject: "Password Reset Email",
        text: "Click on the following link to reset the password",
        html: `<a href='${URL}'><button>Reset Password</button></a>`

    })
    // send msg to user
    res.send({ message: "Password reset link had been sent to your email" })
}

// reset password
exports.resetPassword = async (req, res) => {
    // check if token is valid or not
    let tokenObj = await TokenModel.findOne({ token: req.params.token })
    if (!tokenObj) {
        return res.status(400).json({ error: "Token invalid or may have expired" })
    }
    // find user
    let user = await UserModel.findById(tokenObj.user)
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }

    // encrypt password
    let hashed_password = await bcrypt.hash(req.body.password, 10)


    // save password
    user.password = hashed_password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something Went Wrong" })
    }

    // send message to user
    res.send({ message: "Password reset successful." })
}

// resend verification
exports.resendVerification = async (req, res) => {
    // check if email is registered
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "User/Email not registered" })
    }

    //check if user is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User Already Verified. Login to Continue" })
    }

    // generate verification token
    let tokenObj = await TokenModel.create({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    if (!tokenObj) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    // send token/link in email

    // const URL = `http://localhost:5000/verify/${tokenObj.token}`
    const URL = `${process.env.FRONTEND_URL}/verify/${tokenObj.token}`


    emailSender({
        from: 'noreply@something.com',
        to: req.body.email,
        subject: "Verification E-mail",
        text: `Click on the following link to activate your account ${URL}`,
        html: `<a href='${URL}'><button>Verify Now</button></a>`
    })
    // send message too user
    res.send({ message: "Verification link has been sent to your email" })
}


// login
exports.signin = async (req, res) => {
    let { email, password } = req.body

    // check if email is registered or not
    let user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered" })
    }
    // check if password matches or not
    let passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(400).json({ error: "Email and password do not match" })
    }

    // check if user verified or not

    if (!user.isVerified) {
        return res.status(400).json({ error: "User not Verified. Please Verify your account" })
    }

    // generate login token
    let token = jwt.sign({
        _id: user._id,
        email,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET ,{ expiresIn: 86400 })
    console.log(token)

    // set login token in cookies
    res.cookie('mycookie', token)

    // send login token to frontend
    res.send({
        token,
        user: {
            _id: user._id,
            email,
            username: user.username,
            role: user.role
        }
    })
}

// authentication and authorization
exports.requireLogin = async (req, res, next) => {
    let {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You are not logged in."})
    }
    next()
}

// admin authorization
exports.requireAdmin = async (req, res, next) => {
    let {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You are not logged in."})
    }
    let user = jwt.verify(authorization, process.env.JWT_SECRET)
    if(user.role != 1){
        return res.status(403).json({error: "You must be admin to access this resource"})
    }

    next()
}

// signout
exports.signout = (req, res) => {
    res.clearCookie()
    res.send({message:"Signed out successfully"})
}



// getAllUsers
exports.getAllUser = async(req, res)=>{
    let user = await userModel.find()
    if(!user){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(user)
}

// getUserDetails
exports.getUserDetails = async(req, res) => {
    const id = req.params.id || req.query.id
    let user = await userModel.findById(req.params.id)
    if(!user){
        return res.status(400).json({error: "Something went wrong"})
    }
    res.send(user)
}

// updateUsers
exports.updateUser = async(req, res) =>{
    let userToUpdate = await UserModel.findByIdAndUpdate(req.params.id,{
        role: req.body.role
    },{new: true})
    if(!userToUpdate){
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(userToUpdate)
}

// deleteUser
exports.deleteUser = async(req, res) => {
    let deleteUser = await userModel.findByIdAndDelete(req.params.id)
    if(!deleteUser){
        return res.status(400).json({error:'Cannot Find User'})
    }
    res.send({message: 'User deleted successfully'})
}