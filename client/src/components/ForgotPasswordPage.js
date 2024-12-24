import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "./ui/Input";
import { useAuthStore } from "../store/authStore";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const { forgotPassword, isLoading, error } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await forgotPassword(email)
            setIsSubmitted(true)
        } catch (error) {
            console.log(error)
            setIsSubmitted(true)
        }
    }
    return (
        <div className="flex justify-center items-center gradient_background min-h-screen px-4 py-6 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className="p-6 sm:p-8">
                    <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text'>
                        Forgot Password
                    </h2>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <p className='text-gray-300 text-sm sm:text-base mb-6 text-center'>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <Input
                                icon={Mail}
                                type='text'
                                placeholder='Email Address'
                                label='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 text-sm sm:text-base'
                                type='submit'
                                disabled={isLoading || !email}
                            >
                                {isLoading ? <Loader className='size-5 sm:size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'
                            >
                                <Mail className='h-8 w-8 text-white' />
                            </motion.div>
                            <p className='text-gray-300 text-sm sm:text-base mb-6'>
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                        </div>
                    )}
                </div>
                <div className='px-6 sm:px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <Link to={"/login"} className='text-sm text-purple-400 hover:underline hover:text-purple-300 flex items-center'>
                        <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPasswordPage