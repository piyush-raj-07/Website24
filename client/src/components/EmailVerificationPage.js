import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isResending, setIsResending] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const { verifyEmail, isLoading, error, resendVerificationEmail, user } = useAuthStore();

    const handleResend = async () => {
        if (isDisabled) return;

        setIsResending(true);
        try {
            await resendVerificationEmail(user.UserEmail);
            setIsDisabled(true);
            setTimeout(() => setIsDisabled(false), 30000);
        } catch (error) {
            console.log("error in resend verification email", error);
        }
        setIsResending(false);
    }

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
        }
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className="flex justify-center items-center gradient_background min-h-screen px-4 py-6 sm:py-12">
            <div className='w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-gray-800/10 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md'
                >
                    <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-bg-purple-400 text-transparent bg-clip-text'>
                        Verify Your Email
                    </h2>
                    <p className='text-gray-300 text-sm sm:text-base text-center mb-6'>
                        Enter the 6-digit code sent to your email address
                    </p>
                    <form className='space-y-6'>
                        <div className='flex justify-between gap-2 sm:gap-3'>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='text'
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none'
                                />
                            ))}
                        </div>
                        {error && <p className='text-red-500 text-sm font-semibold mt-2'>{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading || code.some((digit) => !digit)}
                            className='w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 text-sm sm:text-base'
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto size-5 sm:size-6" /> : "Verify Email"}
                        </motion.button>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isDisabled || isResending}
                                className="text-sm text-purple-400 hover:text-purple-300 disabled:text-gray-500 disabled:hover:text-gray-500 transition-colors"
                            >
                                {isResending ? (
                                    <span className="flex items-center">
                                        <Loader className="animate-spin size-3 mr-2" />
                                        Resending...
                                    </span>
                                ) : (
                                    "Resend verification code"
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default EmailVerificationPage