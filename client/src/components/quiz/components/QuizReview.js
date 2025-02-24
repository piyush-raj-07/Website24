import { motion } from 'framer-motion';
import { Check, X, Clock, AlertCircle } from 'lucide-react';

const QuizReview = ({ reviewData }) => {
    const correctCount = reviewData.filter(item => item.isCorrect).length;

    return (
        <>
            {/* Questions Review - Scrollable area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full pb-6"
            >
                <div className="space-y-6">
                    {reviewData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + (index * 0.1) }}
                            className={`bg-gray-700 bg-opacity-50 rounded-xl p-6 border-l-4 ${item.isCorrect ? 'border-green-500' : 'border-red-500'
                                }`}
                        >
                            {/* Question Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center font-raleway space-x-2 mb-2">
                                        <span className="text-sm font-medium text-gray-400">
                                            Question {index + 1}
                                        </span>
                                        {item.isCorrect ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 bg-opacity-20 text-green-400">
                                                Correct
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 bg-opacity-20 text-red-400">
                                                Incorrect
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-gray-200 font-medium text-lg">
                                        {item.question}
                                    </h4>
                                </div>
                                {item.isCorrect ? (
                                    <Check className="text-green-400 h-6 w-6 flex-shrink-0 ml-4" />
                                ) : (
                                    <X className="text-red-400 h-6 w-6 flex-shrink-0 ml-4" />
                                )}
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {item.options.map((option, optIndex) => (
                                    <div
                                        key={optIndex}
                                        className={`p-3 rounded-lg flex items-center space-x-3 ${optIndex === item.correctAnswer
                                            ? 'bg-green-500 bg-opacity-10 border border-green-500'
                                            : optIndex === item.selectedAnswer && !item.isCorrect
                                                ? 'bg-red-500 bg-opacity-10 border border-red-500'
                                                : 'bg-gray-600 bg-opacity-30'
                                            }`}
                                    >
                                        <span className={`h-6 w-6 flex-shrink-0 rounded-full border flex font-libre items-center justify-center ${optIndex === item.correctAnswer
                                            ? 'border-green-500 text-green-500'
                                            : optIndex === item.selectedAnswer && !item.isCorrect
                                                ? 'border-red-500 text-red-500'
                                                : 'border-gray-400 text-gray-400'
                                            }`}>
                                            {String.fromCharCode(65 + optIndex)}
                                        </span>
                                        <span className={`text-sm flex-1 font-raleway ${optIndex === item.correctAnswer
                                            ? 'text-green-400'
                                            : optIndex === item.selectedAnswer && !item.isCorrect
                                                ? 'text-red-400'
                                                : 'text-gray-300'
                                            }`}>
                                            {option}
                                        </span>
                                        {optIndex === item.correctAnswer && (
                                            <Check className="h-5 w-5 text-green-500" />
                                        )}
                                        {optIndex === item.selectedAnswer && !item.isCorrect && (
                                            <X className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default QuizReview; 