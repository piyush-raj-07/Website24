import { motion } from 'framer-motion';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';

const QuestionCard = ({ question, options, selectedOption, onOptionSelect, timeLeft, currentQuestionIndex, totalQuestions }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
        >
            <ProgressBar
                currentQuestion={currentQuestionIndex}
                totalQuestions={totalQuestions}
            />

            <Timer timeLeft={timeLeft} />

            {/* Question */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100 mb-4 sm:mb-6">
                {question}
            </h3>

            {/* Options */}
            <div className="space-y-3 sm:space-y-4">
                {options.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOptionSelect(index)}
                        className={`w-full p-3 sm:p-4 rounded-lg text-left transition duration-200 ${selectedOption === index
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                                : 'bg-gray-700 bg-opacity-50 hover:bg-gray-600 text-gray-300'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${selectedOption === index
                                    ? 'border-white bg-white bg-opacity-20'
                                    : 'border-gray-400'
                                }`}>
                                <span className="text-xs sm:text-sm">
                                    {String.fromCharCode(65 + index)}
                                </span>
                            </div>
                            <span className="text-sm sm:text-base md:text-lg">{option}</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionCard;