const jobsControllers = require("../../controllers/jobs.controller");
const express = require("express");
const router = express.Router();

router.route("/signup")
    .get(jobsControllers.getHighestPaidJobs);
router.route("/login")
    .get(jobsControllers.getHighestPaidJobs);
router.route("/me")
    .get(jobsControllers.getHighestPaidJobs);

module.exports = router;