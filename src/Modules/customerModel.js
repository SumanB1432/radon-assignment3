const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        length: 10,
        required: true,
        unique:true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
    },
    address: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        status: true,
        unique:true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default:"ACTIVE"
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Customer", customerSchema)