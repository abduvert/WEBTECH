const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    },
    totalProducts: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    websiteOrAppLink: {
        type: String
    }
});

const Store = mongoose.model('listofStores', storeSchema);

module.exports = Store;
