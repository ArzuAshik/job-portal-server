// const { getDb } = require("../utils/dbConnect");
const { Job } = require("../models/Job");

exports.getAllJobs = async (req, res, next) => {
    let { sortBy = "", fields = "", page = "1", limit = "10", ...filters } = req.query;
    sortBy = sortBy.replaceAll(",", " ");
    page = Number(page);
    limit = Number(limit);

    if (filters) {
        filters = JSON.parse(JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (matched) => `$${matched}`));
    }

    try {
        const data = await Job.find(filters)
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
        const jobInfo = await Job.findById(id);
        res.status(200).json({
            data: { jobInfo },
            applicationInfo: []
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

exports.applyForJob = async (req, res, next) => {
    res.status(200).json({ message: "hello" })
}

exports.getHighestPaidJobs = async (req, res, next) => {
    try {
        const data = await Tour.find().sort("-viewCount").limit(10);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getMostAppliedJobs = async (req, res, next) => {
    try {
        const data = await Tour.find().sort("fare").limit(5);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}