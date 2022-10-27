const { ObjectId } = require("mongodb");
const { Application } = require("../models/Application");
const { Job } = require("../models/Job");
const { User } = require("../models/User");

exports.getAllJobs = async (req, res, next) => {
    const { email } = req.user;
    const { _id: manager } = await User.findOne({ email });

    let { sortBy = "", fields = "", page = "1", limit = "10", ...filters } = req.query;
    sortBy = sortBy.replaceAll(",", " ");
    page = Number(page);
    limit = Number(limit);

    if (filters) {
        filters = JSON.parse(JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (matched) => `$${matched}`));
    }

    try {
        const data = await Job.find({ manager, ...filters })
            .select(fields.replaceAll(",", " "))
            .sort(sortBy).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));

        res.status(200).json({
            // totalPage: 0,
            currentPage: page,
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getJobDetails = async (req, res, next) => {
    const { id } = req.params;

    // should send application details
    try {
        const jobInfo = await Job.findById(id).populate("manager").populate("applicants.user", "-password");
        res.status(200).json({
            data: { jobInfo },
        });
    } catch (error) {
        res.send(error);
    }
}

exports.updateJob = async (req, res, next) => {
    const { id } = req.params;
    const { applied, ...rest } = req.body;
    try {
        const result = await Job.updateOne({ _id: id }, { $set: rest }, { runValidators: true });

        if (result.modifiedCount > 0) {
            res.status(200).json({
                success: true, message: "Job info updated successfully."
            });
        } else {
            res.status(200).json({
                success: false, message: "Job info update failed."
            });
        }
    } catch (error) {
        res.send(error);
    }
}