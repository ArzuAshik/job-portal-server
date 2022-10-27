const { Application } = require("../models/Application");

exports.preventDuplicateApply = async (req, res, next) => {
    const { id } = req.params;

    // if already applied or not
    const applicationStatus = await Application.findOne({ jobId: id, candidateId: req.user.id });
    if (applicationStatus) {
        return res.status(401).json({ message: "already applied." });
    }
    next();
}