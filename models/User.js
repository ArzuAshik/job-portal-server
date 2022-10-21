const mongoose = require("mongoose");

// schema design
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide your name."],
        trim: true,
        minLength: [3, "Too short name."],
        maxLength: [50, "Name is too large."]
    },
    email: {
        type: String,
        required: [true, "Please Provide your email."],
        trim: true,
        unique: [true, "email is already exist."],
        // validate: {
        //     validator: (value) => {
        //         return Number.isInteger(value);
        //     },
        //     message: "Must be an integer Value."
        // }
    },
    password: {
        type: String,
        required: [true, "Please Provide your password."],
    },
    role: {
        type: String,
        required: [true, "Please Provide your password."],
    },
    image: {
        type: String,
        required: [true, "Please Provide a image for this tour."]
    },

}, {
    timestamps: true
});

// Model
exports.User = mongoose.model("User", userSchema);