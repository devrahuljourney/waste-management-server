const mongoose = require("mongoose");

const paymentCardDetails = new mongoose.Schema({
    cardNumber : {
        type : Number,
        required: true
    },
    cvv : {
        type: Number,
        required: true
    },
    expiryDate : {
        type: Number,
        required:true
    }
})

module.exports = mongoose.model("PaymentCardDetails", paymentCardDetails)