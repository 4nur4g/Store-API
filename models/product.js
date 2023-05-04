const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided'],
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    company:{
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    }
})

module.exports = mongoose.model('Product', productSchema);