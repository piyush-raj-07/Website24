import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Check, X } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import QuestionCard from './QuestionCard';
import InstructionsCard from './components/InstructionsCard';
import QuizReview from './components/QuizReview';

axios.defaults.baseURL = `${process.env.REACT_APP_API}/api`;
axios.defaults.withCredentials = true;

const QuizPage = () => {
    const { user } = useAuthStore();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);
    const [reviewData, setReviewData] = useState(null);
    const [showReview, setShowReview] = useState(false);

    // Fetch questions on mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const { data } = await axios.get('/quiz/questions');
                if (data.success) {
                    setQuestions(data.questions);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch questions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Timer effect
    useEffect(() => {
        if (!isLoading && quizStarted && !quizCompleted && questions.length > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleNextQuestion();
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isLoading, quizStarted, quizCompleted, currentQuestionIndex, questions]);

    // keyboard shortcut handler
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!quizStarted || quizCompleted || isLoading) return;

            const keyToIndex = {
                'a': 0,
                'b': 1,
                'c': 2,
                'd': 3
            };

            const key = e.key.toLowerCase();
            if (keyToIndex.hasOwnProperty(key)) {
                handleOptionSelect(keyToIndex[key]);
            } else if (e.key === 'Enter' && selectedOption !== null) {
                handleNextQuestion();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedOption, quizStarted, quizCompleted, isLoading]);

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = async () => {
        const newAnswers = [...answers, {
            questionId: questions[currentQuestionIndex]._id,
            selectedAnswer: selectedOption
        }];
        setAnswers(newAnswers);

        if (currentQuestionIndex === questions.length - 1) {
            try {
                const { data } = await axios.post('/quiz/submit', { answers: newAnswers, ...(user && { userId: user._id }) });
                if (data.success) {
                    setScore(data.score);
                    setReviewData(data.reviewData);
                    setQuizCompleted(true);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to submit quiz');
            }
        } else {
            //move to next ques
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setTimeLeft(30);
        }
    };

    const handleStartQuiz = () => {
        setQuizStarted(true);
        setTimeLeft(30);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center gradient_background min-h-screen">
                <Loader className="animate-spin text-purple-500 size-8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center gradient_background min-h-screen px-4">
                <div className="text-center text-red-500 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-6">
                    <p className="text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="flex justify-center items-center gradient_background min-h-screen px-4">
                <InstructionsCard onStart={handleStartQuiz} />
            </div>
        );
    }

    // Quiz completion screen
    if (quizCompleted) {
        const percentage = (score / questions.length) * 100;
        const getFeedback = () => {
            if (percentage === 100) return { message: "Perfect Score! Brilliant!", color: "text-green-400" };
            if (percentage >= 80) return { message: "Excellent Work!", color: "text-purple-400" };
            if (percentage >= 60) return { message: "Good Job!", color: "text-blue-400" };
            if (percentage >= 40) return { message: "Nice Try!", color: "text-yellow-400" };
            return { message: "Keep Practicing!", color: "text-red-400" };
        };
        const feedback = getFeedback();

        return (
            <div className="flex justify-center items-start gradient_background min-h-screen px-4 py-8">
                <div className="w-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl"
                    >
                        {/* Score Section */}
                        <div className="p-6 sm:p-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mb-6"
                            >
                                <h2 className="text-3xl font-bold font-libre bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text text-center">
                                    Quiz Completed!
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4 mb-8"
                            >
                                <h3 className={`text-2xl font-bold ${feedback.color} font-raleway text-center`}>
                                    {feedback.message}
                                </h3>
                                <div className="flex justify-center font-libre items-center space-x-2">
                                    <span className="text-gray-300 text-lg">Score:</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-purple-400 text-3xl font-bold"
                                    >
                                        {score}
                                    </motion.span>
                                    <span className="text-gray-300 text-lg">out of {questions.length}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 font-libre rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                        className={`h-full ${percentage === 100 ? 'bg-green-500' :
                                            percentage >= 80 ? 'bg-purple-500' :
                                                percentage >= 60 ? 'bg-blue-500' :
                                                    percentage >= 40 ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                            }`}
                                    />
                                </div>
                            </motion.div>

                            <div className="flex flex-col font-raleway sm:flex-row justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowReview(!showReview)}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700"
                                >
                                    {showReview ? 'Hide Review' : 'Show Review'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600"
                                >
                                    Try Again
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.location.href = '/'}
                                    className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600"
                                >
                                    Back to Home
                                </motion.button>
                            </div>
                        </div>

                        {/* Review Section with Scroll */}
                        <AnimatePresence>
                            {showReview && reviewData && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    {/* Review Header */}
                                    <div className="px-6 sm:px-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-700">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-2 sm:mb-0">
                                                Detailed Review
                                            </h3>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <Check className="text-green-400 h-5 w-5" />
                                                    <span className="text-gray-300">
                                                        {reviewData.filter(item => item.isCorrect).length} Correct
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <X className="text-red-400 h-5 w-5" />
                                                    <span className="text-gray-300">
                                                        {reviewData.length - reviewData.filter(item => item.isCorrect).length} Incorrect
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scrollable Review Content */}
                                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-6 sm:px-8">
                                        <QuizReview reviewData={reviewData} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center gradient_background min-h-screen px-4 py-6 sm:px-6 md:px-8">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        <QuestionCard
                            question={questions[currentQuestionIndex].Question}
                            options={questions[currentQuestionIndex].Options}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                            timeLeft={timeLeft}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={questions.length}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-col items-center mt-4 sm:mt-6 space-y-3 sm:space-y-4 w-full px-4 sm:px-0">
                    <motion.button
                        whileHover={{ scale: selectedOption !== null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedOption !== null ? 0.98 : 1 }}
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null}
                        className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 ${selectedOption === null
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:from-purple-600 hover:to-indigo-700'
                            }`}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                    </motion.button>

                    <div className="text-gray-400 text-xs sm:text-sm text-center hidden md:block">
                        Press <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700 rounded text-xs sm:text-sm">A</kbd> - <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700 rounded text-xs sm:text-sm">D</kbd> to select options, <kbd className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-700 rounded text-xs sm:text-sm">Enter</kbd> for next
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage; 