const express = require('express')
const router = express.Router()
const path = require('path')
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')
const { checkAdmin } = require('./services')

//Get Products
router.get('/getProducts',  (req, res) => {
    Product.find({})
    .then(products => {
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Get popular item base on quantity of sale
router.get('/getPopular', async (req, res) => {
    Product.find()
    .sort({quantity: 'desc'})
    .limit(5)
    .then(topItem => {
        res.json(topItem)
    })
})
//Get products with the specific type
router.post('/getProductsByCategory', (req, res) => {
    Product.find({ category: new ObjectId( req.body.categoryId) })
    .then(products => {
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Get a product with specific id(s)
router.post('/getProductsById', (req, res) => {
    Product.find({_id : req.body.productID})
    .then(products => {
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Post a products
router.post('/createProduct', checkAdmin, (req, res) => {
    let name = req.body.name
    let category = req.body.category
    let description = req.body.description
    let unitPrice = req.body.unitPrice
    let quantity = req.body.quantity
    let thumnail = req.body.thumnail
    let additionalInfo = req.body.additionalInfo || ''
    if (typeof name !== 'undefined' && typeof category !== 'undefined' && typeof description !== 'undefined' && typeof unitPrice !== 'undefined' && typeof quantity !== 'undefined' && typeof thumnail !== 'undefined') {
        Product.create({ name, description, price: unitPrice, thumnail, quantity, category: new ObjectId(category), additionalInfo })
        .then(product => {
            res.json(product)
        })
        .catch(error => console.log(error))
    }
    else {
        res.sendStatus(400)
    }
})

module.exports = router