const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name : {
        type :  String,
        required: true
    },
    description : {
        type: String,
        required: String
    },
    pricePerKg : {
        type : Number,
        required: true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("SubCategory", subCategorySchema);