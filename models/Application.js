const mongoose = require("mongoose");

// schema design
const applicationSchema = mongoose.Schema({
    jobId: {
        type: String,
        required: [true, "Please Provide your name."],
    },
    candidateId: {
        type: String,
        required: [true, "Please Provide your email."],
    },
    resume: {
        type: String,
    }
}, {
    timestamps: true
});

// Model
exports.Application = mongoose.model("Application", applicationSchema);