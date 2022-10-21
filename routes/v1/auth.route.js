const authControllers = require("../../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.route("/signup")
    .post(authControllers.signup);
router.route("/login")
    .post(authControllers.login);
router.route("/me")
    .get(authControllers.getUserInfo);

module.exports = router;