const mongoose = require("mongoose");

// Define the schema
const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    dob: {
        type: Date
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});


const Profile = mongoose.model("Profile", profileSchema);



module.exports = Profile;
