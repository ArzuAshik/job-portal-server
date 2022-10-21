const managerControllers = require("../../controllers/manager.controller");
const express = require("express");
const router = express.Router();

// router.route("/highest-paid")
//     .get(jobsControllers.getHighestPaidJobs);

// router.route("/most-applied")
//     .get(jobsControllers.getMostAppliedJobs);

router.route("/")
    .get(managerControllers.getAllJobs)
    .post(managerControllers.addJob);

router.route("/:id")
    .get(managerControllers.getJobDetails)
    .patch(managerControllers.updateJob)

// router.route("/:id/apply")
//     .post(jobsControllers.applyForJob);
module.exports = router;