const mongoose = require('mongoose');
const prodectSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldprice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    brandname: {
        type: String,
        required: true,
    },
    taxStatus: {
        type: String,
        required: true,
    },
    popularity: {
        type: String,
        required: true,
    },
    new: {
        type: String,
    },
    brandstatus: {
        type: String,
        required: true,
    },
    title_ar: {
        type: String,
        required: true,
    },
    brandname_ar: {
        type: String,
        required: true,
    },
    taxStatus_ar: {
        type: String,
        required: true,
    },
    returnPolicy_ar: {
        type: String,
        required: true,
    },
    popularity_ar: {
        type: String,
        required: true,
    },
    new_ar: {
        type: String,
        required: true,
    },
    brandstatus_ar: {
        type: String,
        required: true,
    },
    imgbrand: {
        type: String,
        required: true,
    },
    img1: {
        type: String,
        required: true,
    },
    img2: {
        type: String,
    },
    img3: {
        type: String,
    },
    });
module.exports = mongoose.model('Prodect',prodectSchema )