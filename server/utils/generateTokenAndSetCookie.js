const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })

    res.cookie("token", token, {
        httpOnly: true, // XSS protection
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", // CSRF protection
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    })

    return token;
}

module.exports = generateTokenAndSetCookie;