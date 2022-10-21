// const { getDb } = require("../utils/dbConnect");
const { User } = require("../models/User");

exports.signup = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const data = await user.save();

        res.status(200).json({
            message: "Signup Successful.",
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const data = await User.find(req.body).select("-password -createdAt -updatedAt");
        res.status(200).json({
            message: "Login Successful.",
            data
        });
    } catch (error) {
        res.send(error);
    }
}

exports.getUserInfo = async (req, res, next) => {
    try {
        const data = await User.findOne(req.query).select("-password -createdAt -updatedAt");

        res.status(200).json({
            data
        });
    } catch (error) {
        res.send(error);
    }
}