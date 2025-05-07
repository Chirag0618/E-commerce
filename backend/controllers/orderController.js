const OrderItemsModel = require('../models/OrderItemsModel')
const OrderModel = require('../models/OrderModel')

// place order
exports.placeOrder = async (req, res) => {
    // orderItem: [{product1, quantity1}, {product2, quantity2}]

    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItemObj => {
            let orderItemToAdd = await OrderItemsModel.create({
                product: orderItemObj.product,
                quantity: orderItemObj.quantity
            })
            if (!orderItemToAdd) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            return orderItemToAdd._id
        })
    )

    let individualTotals = await Promise.all(
        orderItemsIds.map(async orderItemId => {
            let orderItemObj = await OrderItemsModel.findById(orderItemId).populate('product', 'product_price')
            return orderItemObj.product.product_price * orderItemObj.quantity
        })
    )

    let total = individualTotals.reduce((a, c) => a + c)

    let orderToPlace = await OrderModel.create({
        orderItems: orderItemsIds,
        total: total,
        user: req.body.user,
        street_address: req.body.street_address,
        alternate_street_address: req.body.alternate_street_address,
        city: req.body.city,
        postal_code: req.body.postal_code,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone
    })

    if (!orderToPlace) {
        return res.status(400).json({ error: "Failed to place order" })
    }
    res.send(orderToPlace)
}

// get all orders

exports.getAllOrders = async (req, res) => {
    let orders = await OrderModel.find().populate('user', 'username').populate({path: 'orderItems', populate: {path: 'product', populate:'category'}})
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}

// get order details

exports.getOrderDetails = async (req, res) => {
    let order = await OrderModel.findById(req.params.id).populate('user', 'username')
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// get order by user
exports.getOrderByUser = async (req, res) => {
    let orders = await OrderModel.find({ user: req.params.userId }).populate('user', 'username')
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}

// update order
exports.updateOrder = async (req, res) => {
    let orderToUpdate = await OrderModel.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true })
    if (!orderToUpdate) {
        return res.status(400).json({ error: "Failed to update" })
    }
    res.send(orderToUpdate)
}

// delete order
exports.deleteOrder = (req, res) => {
    OrderModel.findByIdAndDelete(req.params.id)
        .then((deletedOrder) => {
            if (!deletedOrder) {
                return res.status(400).json({ error: "Order Not Found" })
            }
            deletedOrder.orderItems.map(orderItem => {
                OrderItemsModel.findByIdAndDelete(orderItem)
                    .then(deletedOrderItem => {
                        if (!deletedOrderItem) {
                            return res.status(400).json({ error: "Failed To Retrieve item" })
                        }
                    })
            })
            res.send({ message: "Order Removed Successfully" })
        })
        .catch(error => res.status(400).json({ error: error.message }))
}