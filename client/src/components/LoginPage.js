import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from './ui/Input'
import { Lock, Mail, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useAuthStore()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
        } catch (error) {
            console.log(error)
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
                <div className='p-6 sm:p-8'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-300 to-bg-purple-400 text-transparent bg-clip-text'>Welcome Back</h2>
                    <p className='text-gray-400 text-sm sm:text-base text-center mb-6'>Sign in to your account</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            icon={Mail}
                            type='text'
                            placeholder='Email Address'
                            label='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Password'
                            label='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='flex justify-end'>
                            <Link to='/forgot-password' className='text-sm text-purple-400 hover:underline'>
                                Forgot Password?
                            </Link>
                        </div>

                        {error && <p className='text-red-500 text-sm font-semibold mt-2'>{error}</p>}

                        <motion.button
                            className='w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                            font-bold rounded-lg shadow-lg hover:from-purple-600
                            hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                            focus:ring-offset-gray-900 transition duration-200 text-sm sm:text-base'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto size-5 sm:size-6" /> : "Sign In"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-6 sm:px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-purple-400 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginPage