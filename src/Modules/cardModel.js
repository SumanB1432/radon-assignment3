const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

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
        type: objectId,
        refer: "Customer",
        required: true,

    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Card", cardSchema)