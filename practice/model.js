const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const prodschema = mongo.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        quantity: {
            type: Number,
            required: [true,"Please enter the quantity"],
            default:0
        },
        email: {
            type: String,
            required: [true,"Please enter your email"]
        },
    },
    {
        timestamps: true
    }
)

const product = mongoose.model("Product",prodschema)

module.exports = product