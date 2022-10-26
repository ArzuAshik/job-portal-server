const jwt = require('jsonwebtoken');
exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    }

    return jwt.sign(payload, process.env.JSON_KEY, { expiresIn: "1 days" });
}