const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Banner = new Schema({
    banners: [String],
    updateAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Banner', Banner)