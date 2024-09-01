const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    pricePerKg: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Scheduled", "Pick Up", "Processing", "Completed"]
    },
    soldDate: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date
    },
    pickUpBoyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }
});

module.exports = mongoose.model("Waste", wasteSchema);
