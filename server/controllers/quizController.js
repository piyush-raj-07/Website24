const QnAModel = require("../models/Questions");

const getRandomQuestions = async (req, res) => {
    try {
        // get 5 random questions from db
        const questions = await QnAModel.aggregate([
            { $sample: { size: 5 } },
            // exclude correctAns to send to frontend
            {
                $project: {
                    Question: 1,
                    Options: 1,
                    _id: 1
                }
            }
        ]);

        if (!questions || questions.length < 5) {
            throw new Error('Not enough questions in the database');
        }

        res.status(200).json({
            success: true,
            questions
        });
    } catch (error) {
        console.log("error in getting questions", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const submitQuiz = async (req, res) => {
    const { answers } = req.body; // [{ questionId, selectedAnswer }]

    try {
        if (!answers || !Array.isArray(answers)) {
            throw new Error('Invalid submission format');
        }

        let score = 0;
        const questions = await QnAModel.find({
            '_id': { $in: answers.map(a => a.questionId) }
        });

        // Create a map for quick lookup of correct answers
        const correctAnswers = new Map(
            questions.map(q => [q._id.toString(), q.CorrectAnswerIndex])
        );

        // Calculate score and prepare review data
        const reviewData = answers.map(answer => {
            const question = questions.find(q => q._id.toString() === answer.questionId);
            const isCorrect = correctAnswers.get(answer.questionId) === answer.selectedAnswer;
            if (isCorrect) score += 1;

            return {
                question: question.Question,
                options: question.Options,
                selectedAnswer: answer.selectedAnswer,
                correctAnswer: correctAnswers.get(answer.questionId),
                isCorrect
            };
        });

        res.status(200).json({
            success: true,
            score,
            totalQuestions: answers.length,
            reviewData
        });
    } catch (error) {
        console.log("error in submitting quiz", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

const createQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswerIndex } = req.body;

        if (!question || !options || correctAnswerIndex === undefined) {
            throw new Error('Missing required fields');
        }

        if (!Array.isArray(options) || options.length < 2) {
            throw new Error('Options must be an array with at least 2 choices');
        }

        if (correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
            throw new Error('Invalid correct answer index');
        }

        const newQuestion = new QnAModel({
            Question: question,
            Options: options,
            CorrectAnswerIndex: correctAnswerIndex
        });

        await newQuestion.save();

        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            question: {
                _id: newQuestion._id,
                Question: newQuestion.Question,
                Options: newQuestion.Options
            }
        });
    } catch (error) {
        console.log("error in creating question", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = {
    getRandomQuestions,
    submitQuiz,
    createQuestion
} 