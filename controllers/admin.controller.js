const { Application } = require("../models/Application");
const { User } = require("../models/User");

exports.getCandidates = async (req, res, next) => {
    try {
        const data = await User.find({ role: "candidate" })
            .select("-password -createdAt -updatedAt -role -image");
        // .sort(sortBy).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getCandidateDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userInfo = await User.findById(id)
            .select("-password -createdAt -updatedAt");
        const applications = await Application.find({ candidateId: userInfo._id.toString() })
        .populate({path:"jobId", select: "-applicants"}).select("-candidateId")

        res.status(200).json({
            data: { userInfo, applications }
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getManagers = async (req, res, next) => {
    try {
        const data = await User.find({ role: "manager" })
            .select("-password -createdAt -updatedAt");
        // .sort(sortBy).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.updateUserRole = async (req, res, next) => {
    const { id } = req.params;
    if (!id || !req.body.role) {

    }

    try {
        const result = await User.updateOne({ _id: id }, { $set: { role: req.body.role } }, { runValidators: true });

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: `The user is now a ${req.body.role}` });
        } else {
            res.status(200).json({ success: false, message: `Can't Update the user.` });
        }
    } catch (error) {
        res.send(error);
    }
}