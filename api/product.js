const express = require('express')
const router = express.Router()
const path = require('path')
const { ObjectId } = require('mongodb')
const services = require('./services')
const Product = require('../models/Product')

//Get Products
router.get('/getProducts',  (req, res) => {
    Product.find({})
    .then(products => {
        products.forEach((product) => {
            product.thumnail = 'data:image/jpg;base64,' + services.base64_encode(path.resolve(product.thumnail))
        })
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
router.post('/getProducts', (req, res) => {
    Product.find({ category: new ObjectId( req.body.categoryId) })
    .then(products => {
        products.forEach((product) => {
            product.thumnail = 'data:image/jpg;base64,' + services.base64_encode(path.resolve(product.thumnail))
        })
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Get a product with specific id(s)
router.post('/getProductsById', (req, res) => {
    console.log(req.body.productID)
    Product.find({_id : req.body.productID})
    .then(products => {
        products.forEach((product) => {
            product.thumnail = 'data:image/jpg;base64,' + services.base64_encode(path.resolve(product.thumnail))
        })
        res.json(products)
    })
    .catch(error => console.log(error))
})
//Post a products
router.post('/createProduct',  (req, res) => {
    console.log(req.query.id)
})

module.exports = router