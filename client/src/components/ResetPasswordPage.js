import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./ui/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, error, isLoading } = useAuthStore();

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token, password);

            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

    return (
        <div className="flex justify-center items-center gradient_background min-h-screen px-4 py-6 sm:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-6 sm:p-8'>
                    <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text'>
                        Reset Password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='New Password'
                            value={password}
                            label='New Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            label='Confirm New Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        {error && <p className='text-red-500 text-sm font-semibold mt-2'>{error}</p>}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                            font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none 
                            focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 
                            transition duration-200 text-sm sm:text-base'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto size-5 sm:size-6" /> : "Set New Password"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
export default ResetPasswordPage;