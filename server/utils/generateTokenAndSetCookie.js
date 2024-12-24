const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "14d",
    })

    res.cookie("token", token, {
        httpOnly: true, // XSS protection
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // CSRF protection
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    })

    return token;
}

module.exports = generateTokenAndSetCookie;