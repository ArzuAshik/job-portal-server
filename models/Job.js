const mongoose = require("mongoose");

// schema design
const jobSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide the title of this Job."],
        trim: true,
        minLength: [3, "Too short name."],
        maxLength: [50, "Name is too large."]
    },
    position: {
        type: String,
        required: [true, "Please Provide the position for this Job."]
    },
    type: {
        type: String,
        required: [true, "Please Provide job type."]
        // full time, part time, remote, intern
    },
    description: {
        type: String,
        required: [true, "Please Provide the job description."]
    },
    location: {
        type: String,
        required: [true, "Please Provide the fare of this tour."],
    },
    skills: {
        type: [String],
        required: [true, "Please Provide required skills."],
        validate: {
            validator: (value) => {
                if (value.length === 0) return false;
                return value.every((skill) => skill.length >= 2)
            },
            message: "Should have a skill."
        }
    },
    salaryFrom: {
        type: Number,
        required: [true, "Please Provide salary From."],
        min: [1, ""],
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Must be an integer Value."
        }
    },
    salaryTo: {
        type: Number,
        required: [true, "Please Provide salary To."],
        min: [1, ""],
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Must be an integer Value."
        }
    },
    deadline: {
        // should be a object id
        type: String,
        required: [true, "Please Provide the deadline."]
    },
    applied: {
        type: Number,
        required: true,
        default: 0
    },
    managerId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Model
exports.Job = mongoose.model("Job", jobSchema);