const express = require('express')
const router = express.Router()
const path = require('path')
const user = require('./user')
const product = require('./product')
const login = require('./login')
const Category = require('../models/Category')
const services = require('./services')
const Product = require('../models/Product')

router.use('/api/products', product)
router.use('/api/users', services.checkToken, user)
router.use('/api/auth', login)

router.get('/api/getCategories', (req, res) => {
    Category.find({})
    .then(categories => {
        categories.forEach((category) => {
            category.thumnail = 'data:image/jpg;base64,' + services.base64_encode(path.resolve(category.thumnail))
        })
        res.json(categories)
    })
    .catch(error => console.log(error))
})
//Search API
router.post('/api/search', async (req, res) => {
    // let result = await Product.find({ name: { $regex: (req.query.searchInput).toString(), $options: 'ix' }})
    let results = []
    let products = await Product.find()
    let searchKey = req.body.searchInput
    products.forEach(product => {
        if ((product.name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchKey))
            results.push({name: product.name, id: product.id})
    })
    res.json(results)
})

module.exports = router