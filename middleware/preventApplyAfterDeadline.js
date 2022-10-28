const { Job } = require("../models/Job");

exports.preventApplyAfterDeadline = async (req, res, next) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    // checking if the deadline is expired or not
    if (new Date() > job.deadline) {
        return res.status(200).json({ message: `Sorry, you are late. The deadline was ${new Date(job.deadline).toLocaleDateString('en-GB', { year: "numeric", month: "long", day: "numeric" })}.` });
    }
    next();
}