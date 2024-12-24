const bcrypt = require('bcrypt');
const crypto = require('crypto');

const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { sendVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require("../utils/email");
const validateEmail = require("../utils/validateEmail");
const UserModel = require("../models/Users");

const signup = async (req, res) => {
    const {
        UserEmail,
        password,
        Name,
        Degree,
        Grad_Year,
    } = req.body;

    try {
        console.log(req.body);
        if (!UserEmail || !password || !Name || !Degree || !Grad_Year) {
            throw new Error('All fields are required');
        }

        const emailValidation = validateEmail(UserEmail);
        if (!emailValidation.isValid) {
            throw new Error(emailValidation.error);
        }

        const userAlreadyExists = await UserModel.findOne({ UserEmail });
        console.log(userAlreadyExists);
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new UserModel({
            UserEmail,
            password: hashedPassword,
            Name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,   // 24 hours
            Degree,
            Grad_Year
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(UserEmail, verificationToken);

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error('Invalid or expired verification code');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }

}

const login = async (req, res) => {
    const { UserEmail, password } = req.body;

    try {
        const emailValidation = validateEmail(UserEmail);
        if (!emailValidation.isValid) {
            throw new Error(emailValidation.error);
        }

        const user = await UserModel.findOne({ UserEmail });
        if (!user) {
            throw new Error('Invalid email');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        generateTokenAndSetCookie(res, user._id);

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("error in login", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}

const forgotPassword = async (req, res) => {
    const { UserEmail } = req.body;
    try {
        const user = await UserModel.findOne({ UserEmail });
        if (!user) {
            throw new Error('User not found');
        }

        // generate reset password token
        const resetPasswordToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.UserEmail, `http://localhost:3000/reset-password/${resetPasswordToken}`); // frondtend url

        res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
    } catch (error) {
        console.log("error in forgot password", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            throw new Error('Invalid or expired reset password token');
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        // clear reset password token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.UserEmail);

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.log("error in reset password", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            throw new Error('User not found');
        }

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log("error in check auth", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const resendVerificationEmail = async (req, res) => {
    const { UserEmail } = req.body;
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    try {
        const user = await UserModel.findOne({ UserEmail });
        if (!user) {
            throw new Error('User not found');
        }

        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = verificationTokenExpiresAt;
        await user.save();

        await sendVerificationEmail(UserEmail, verificationToken);
        res.status(200).json({ success: true, message: 'Verification email sent successfully' });
    } catch (error) {
        console.log("error in resend verification email", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = {
    signup,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth,
    resendVerificationEmail
}