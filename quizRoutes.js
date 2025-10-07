import express from 'express';
import * as controller from '../controllers/quizController.js';
import { validateCreateQuiz, validateAddQuestion, validateSubmission } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateCreateQuiz, controller.createQuizHandler);
router.get('/', controller.listQuizzesHandler);
router.post('/:quizId/questions', validateAddQuestion, controller.addQuestionHandler);
router.get('/:quizId/questions', controller.getPublicQuestionsHandler);
router.post('/:quizId/submit', validateSubmission, controller.submitAnswersHandler);

export default router;
