const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store' // Reference to the Store model
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
