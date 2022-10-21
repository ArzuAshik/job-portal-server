// const { getDb } = require("../utils/dbConnect");
const { Job } = require("../models/Job");
const { Application } = require("../models/Application");

exports.getAllJobs = async (req, res, next) => {
    let { sortBy = "", page = "1", limit = "10", ...filters } = req.query;
    sortBy = sortBy.replaceAll(",", " ");
    page = Number(page);
    limit = Number(limit);

    if (filters) {
        filters = JSON.parse(JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (matched) => `$${matched}`));
    }

    try {
        const data = await Job.find()
            .select("-managerid -applied")
            .sort(sortBy).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));

        res.status(200).json({
            // totalPage: 0,
            // currentPage: page,
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.addJob = async (req, res, next) => {
    try {
        const job = new Job(req.body);
        const result = await job.save();
        res.json(result);
    } catch (error) {
        res.json({ error, msg: "error" });
    }
}
exports.getJobDetails = async (req, res, next) => {
    // need to send manager info
    const { id } = req.params;
    try {
        const data = await Job.findById(id);
        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}
exports.updateJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Job.updateOne({ _id: id }, { $set: req.body }, { runValidators: true })
        if (result.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Job info updated successfully."
            });
        } else {
            res.status(200).json({
                success: false,
                message: "Job info update failed."
            });
        }
    } catch (error) {
        res.send(error);
    }
}

exports.applyForJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        const application = new Application(req.body);
        const apply = await application.save();
        const result = await Job.updateOne({ _id: id }, { $inc: { applied: 1 } });

        // application collection should update

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: "successfully applied for the job.", apply, result });
        } else{
            res.status(200).json({ success: false, message: "application failed.", result, apply });
        }

    } catch (error) {
        res.status(200).json({ success: false, message: "application failed.", a: req.body });
    }
}

exports.getHighestPaidJobs = async (req, res, next) => {
    try {
        const data = await Job.find().sort("-salaryTo").limit(10);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getMostAppliedJobs = async (req, res, next) => {
    try {
        const data = await Job.find().sort("-applied").limit(5);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}