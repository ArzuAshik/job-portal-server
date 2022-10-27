const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

// schema design
const applicationSchema = mongoose.Schema({
    jobId: {
        type: ObjectId,
        ref: "Job",
        required: [true, "Please Provide your name."],
    },
    candidateId: {
        type: ObjectId,
        ref: "User",
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