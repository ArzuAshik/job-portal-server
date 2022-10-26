const authControllers = require("../../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");

router.route("/signup")
    .post(authControllers.signup);
router.route("/login")
    .post(authControllers.login);
    
router.use(verifyToken);
router.route("/me")
    .get(authControllers.getUserInfo);

module.exports = router;