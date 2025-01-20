import { Clock } from 'lucide-react';

const Timer = ({ timeLeft }) => {
    const isLowTime = timeLeft <= 10;

    return (
        <div className="flex items-center justify-end mb-4">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
                <Clock
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${isLowTime
                        ? 'text-red-400 animate-pulse'
                        : 'text-purple-400'
                        }`}
                />
                <span
                    className={`font-mono text-base sm:text-lg ${isLowTime
                        ? 'text-red-400'
                        : 'text-purple-400'
                        }`}
                >
                    {timeLeft}s
                </span>
            </div>
        </div>
    );
};

export default Timer; 