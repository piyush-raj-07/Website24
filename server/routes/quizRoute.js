const express = require('express');
const { getRandomQuestions, submitQuiz, createQuestion } = require('../controllers/quizController');

const router = express.Router();

router.get('/questions', getRandomQuestions);

router.post('/submit', submitQuiz);

router.post('/create', createQuestion);

module.exports = router; 