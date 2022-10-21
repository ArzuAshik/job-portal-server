const managerControllers = require("../../controllers/manager.controller");
const express = require("express");
const router = express.Router();

router.route("/")
    .get(managerControllers.getAllJobs)

router.route("/:id")
    .get(managerControllers.getJobDetails)
    .patch(managerControllers.updateJob)

module.exports = router;