const { Job } = require("../models/Job");
const { Application } = require("../models/Application");
const { User } = require("../models/User");

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
        const { email } = req.user;
        const user = await User.findOne({ email });
        const result = await Job.create({ ...req.body, manager: user._id.toString() });
        res.json(result);
    } catch (error) {
        res.json({ error, msg: "error" });
    }
}

exports.getJobDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        const info = await Job.findById(id).populate("manager").select("-applicants");
        const data = info.toObject();
        delete data.manager.password;

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
        const applicationData = {
            jobId: id,
            candidateId: req.user.id,
            resume: undefined
        };
        if (req.file) {
            applicationData.resume = req.file.filename;
        }

        const apply = await Application.create(applicationData);
        const result = await Job.updateOne(
            { _id: id },
            {
                $push: {
                    applicants: { user: req.user.id, resume: req.file.filename }
                }
            }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: "successfully applied for the job.", apply, result });
        } else {
            res.status(200).json({ success: false, message: "application failed.", result, apply });
        }

    } catch (error) {
        console.log(error);
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
        const data = await Job.find().sort("-applicants").limit(5);

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}