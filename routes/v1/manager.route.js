const managerControllers = require("../../controllers/manager.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");
const auth = require("../../middleware/auth");

router.use(verifyToken);
router.use(auth("manager", "admin"));
router.route("/")
    .get(managerControllers.getAllJobs);

router.route("/:id")
    .get(managerControllers.getJobDetails)
    .patch(managerControllers.updateJob);

module.exports = router;