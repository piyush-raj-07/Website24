import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from './ui/Input'
import { Lock, Mail, User, GraduationCap, Calendar, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from './ui/PasswordStrengthMeter'
import { useAuthStore } from '../store/authStore'

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [degree, setDegree] = useState('')
    const [gradYear, setGradYear] = useState('')

    const navigate = useNavigate()
    const { signup, error, isLoading } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await signup(email, password, name, degree, gradYear)
            navigate('/verify-email')
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
                    <h2 className='text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-300 to-bg-purple-400 text-transparent bg-clip-text'>Join EESA</h2>
                    <p className='text-gray-400 text-sm sm:text-base text-center mb-6'>Create your account to get started</p>

                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={User}
                            type='text'
                            placeholder='Full Name'
                            label='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type='text'
                            placeholder='Email Address'
                            label='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="flex flex-col sm:flex-row sm:gap-3">
                            <div className="w-full sm:w-1/2">
                                <Input
                                    icon={GraduationCap}
                                    type='text'
                                    placeholder='Degree'
                                    label='Degree'
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <Input
                                    icon={Calendar}
                                    type='number'
                                    placeholder='Graduation Year'
                                    label='Graduation Year'
                                    value={gradYear}
                                    onChange={(e) => setGradYear(e.target.value)}
                                />
                            </div>
                        </div>

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Password'
                            label='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className='text-red-500 text-sm font-semibold mt-2'>{error}</p>}
                        <div className="mb-6">
                            <PasswordStrengthMeter password={password} />
                        </div>

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
                            {isLoading ? <Loader className="animate-spin mx-auto size-5 sm:size-6" /> : "Create Account"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-6 sm:px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-purple-400 hover:underline'>Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default SignupPage