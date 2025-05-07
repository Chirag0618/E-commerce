const { register, verifyEmail, forgetPassword, resetPassword, resendVerification, signin, signout, getAllUser, getUserDetails, deleteUser, updateUser } = require('../controllers/userController')
const { userRules, validationMethod, passwordRules } = require('../middleware/validationScript')

const router = require('express').Router()

router.get('/getalluser', getAllUser)
router.get('/getuserdetail/:id', getUserDetails)


router.put('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id', deleteUser)
router.post('/register',userRules, validationMethod, register)
router.get('/verify/:token', verifyEmail )
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token',passwordRules, validationMethod,  resetPassword)
router.post('/resendverification', resendVerification)
router.post('/login', signin)
router.get('/signout', signout)





module.exports = router