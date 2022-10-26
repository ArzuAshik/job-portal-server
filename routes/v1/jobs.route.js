const jobsControllers = require("../../controllers/jobs.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");
const auth = require("../../middleware/auth");

router.use(verifyToken);

router.route("/highest-paid")
    .get(jobsControllers.getHighestPaidJobs);

router.route("/most-applied")
    .get(jobsControllers.getMostAppliedJobs);

router.route("/")
    .get(jobsControllers.getAllJobs)
    .post(auth("manager"), jobsControllers.addJob);

router.route("/:id/apply")
    .post(jobsControllers.applyForJob);

router.route("/:id")
    .get(jobsControllers.getJobDetails)
// .patch(jobsControllers.updateJob)

module.exports = router;