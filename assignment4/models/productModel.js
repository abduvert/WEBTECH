const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    product: {
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
    }
});

// Create the product model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
