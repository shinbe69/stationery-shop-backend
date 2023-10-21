const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

let isConnect = new Promise((resolve, reject) => {
    mongoose.connect('mongodb+srv://doanquocsang:Imabelieber699@cluster0.xfjeogm.mongodb.net/?retryWrites=true&w=majority')
    .then(() => resolve(true))
    .catch(() => reject(false))
})

module.exports = { isConnect }
