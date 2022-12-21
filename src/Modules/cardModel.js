const mongoose = require("mongoose");


let cardSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: true
    },
    cardType: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    vision: {
        type: String
    },
    customerId: {
        required: true,
        type:String,

    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Card", cardSchema)