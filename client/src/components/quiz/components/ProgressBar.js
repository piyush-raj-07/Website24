import { motion } from 'framer-motion';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                />
            </div>
        </div>
    );
};

export default ProgressBar; 