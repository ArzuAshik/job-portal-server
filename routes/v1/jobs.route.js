const jobsControllers = require("../../controllers/jobs.controller");
const express = require("express");
const router = express.Router();

router.route("/highest-paid")
    .get(jobsControllers.getHighestPaidJobs);

router.route("/most-applied")
    .get(jobsControllers.getMostAppliedJobs);

router.route("/")
    .get(jobsControllers.getAllJobs)
// .post(jobsControllers.addJob);

router.route("/:id")
    .get(jobsControllers.getJobDetails)
// .patch(jobsControllers.updateJob)

router.route("/:id/apply")
    .post(jobsControllers.applyForJob);
module.exports = router;