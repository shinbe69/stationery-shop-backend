const express = require('express')
const router = express.Router()
const path = require('path')
const { ObjectId } = require('mongodb')
const Order = require('../models/Order')
const User = require('../models/User')

//Get Products
router.get('/getOrders',  (req, res) => {
    Order.find({})
    .then(products => {
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Get a product with specific id(s)
router.post('/getOrdersById', (req, res) => {
    Order.find({_id : req.body.orderID})
    .then(orders => {
        res.json(orders)
    })
    .catch(error => console.log(error))
})
//Post a products
router.post('/createOrder', (req, res) => {
    let username = req.body.username
    let items = req.body.items
    let value = req.body.value
    let address = req.body.address
    User.findOne({ userName: username })
    .then(() => {
        if (typeof items !== 'undefined' && typeof value !== 'undefined' && typeof address !== 'undefined') {
            Order.create({ items, value, address, user: username })
            .then(order => {
                res.json(order._id)
            })
            .catch(error => console.log(error))
        }
        else {
            res.sendStatus(400)
        }
    })
    .catch(error => {
        console.log(err)
        res.sendStatus(400)
    })
})
//Confirm order
router.patch('/confirmOrder', (req, res) => {
    Order.findOne({ _id: req.body.orderID })
    .then(order => {
        order.updateOne({ status: 'confirmed' })
        .then(() => res.sendStatus(200))
        .catch(error => console.log(error))
    }).catch(error => {
        console.log(err)
        res.sendStatus(400)
    })
})

module.exports = router