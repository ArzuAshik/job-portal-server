const adminControllers = require("../../controllers/admin.controller");
const express = require("express");
const router = express.Router();

router.route("/candidates")
    .get(adminControllers.getCandidates);
router.route("/candidates/:id")
    .get(adminControllers.getCandidateDetails);
router.route("/managers")
    .get(adminControllers.getManagers);
router.route("/user-role/:id")
    .patch(adminControllers.updateUserRole);

module.exports = router;