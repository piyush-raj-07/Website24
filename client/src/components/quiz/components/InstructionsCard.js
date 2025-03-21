import { motion } from 'framer-motion';
import { Clock, KeyRound, Brain, Award } from 'lucide-react';

const InstructionsCard = ({ onStart }) => {
    const instructions = [
        {
            icon: <Clock className="w-6 h-6 text-purple-400" />,
            title: "Time Management",
            description: "You have 30 seconds for each question. Choose wisely!"
        },
        {
            icon: <KeyRound className="w-6 h-6 text-purple-400" />,
            title: "Keyboard Shortcuts",
            description: "Use A-D keys to select options, Enter to confirm"
        },
        {
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            title: "No Going Back",
            description: "Once you move to the next question, you can't return"
        },
        {
            icon: <Award className="w-6 h-6 text-purple-400" />,
            title: "Scoring",
            description: "Each correct answer earns you one point"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text mb-8">
                Quiz Instructions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {instructions.map((instruction, index) => (
                    <div
                        key={index}
                        className={`${instruction.title === "Keyboard Shortcuts" ? "hidden md:flex" : "flex"} items-start font-raleway space-x-4 p-4 rounded-lg bg-gray-700 bg-opacity-50`}
                    >
                        {instruction.icon}
                        <div>
                            <h3 className={`${instruction.title === "Keyboard Shortcuts" ? "hidden md:flex" : "flex"} font-raleway font-semibold text-gray-100 mb-1`}>
                                {instruction.title}
                            </h3>
                            <p className={`{instruction.title === "Keyboard Shortcuts" ? "hidden md:flex" : "flex"} font-libre text-gray-400 text-sm`}>
                                {instruction.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStart}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-libre font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 text-lg"
                >
                    Start Quiz
                </motion.button>
            </div>
        </motion.div>
    );
};

export default InstructionsCard; 