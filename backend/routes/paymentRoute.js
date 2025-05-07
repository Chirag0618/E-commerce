const express = require('express')
const { getStripeKey, processPayment } = require('../controllers/paymentController')
const router = express.Router()

router.get('/getStripeKey', getStripeKey)
router.post('/processpayment', processPayment)

module.exports = router