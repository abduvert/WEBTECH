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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
