const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getStripeKey = (req, res) => {
  res.send({ STRIPE_API_KEY: process.env.STRIPE_API_KEY })
}

exports.processPayment = async (req, res) => {
  // const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: "npr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}