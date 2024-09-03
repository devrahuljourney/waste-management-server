const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "PickupBoy", "Admin"],
        default: "User"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    soldWastes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Waste"
        }
    ],
    wasteToPickUps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Waste"
        }
    ],
    readyForSolds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Waste"
        }
    ],
    completedPickUps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Waste"
        }
    ],
    paymentCardDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentCardDetails"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User
