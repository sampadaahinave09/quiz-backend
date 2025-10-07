import * as service from '../services/quizService.js';

export function createQuizHandler(req, res) {
  try {
    const quiz = service.createQuiz(req.body.title);
    return res.status(201).json(quiz);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export function addQuestionHandler(req, res) {
  try {
    const quizId = req.params.quizId;
    const payload = {
      type: req.body.type,
      text: req.body.text,
      options: req.body.options,
      correctOptionIds: req.body.correctOptionIds,
      correctText: req.body.correctText
    };
    const q = service.addQuestion(quizId, payload);
    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export function listQuizzesHandler(req, res) {
  const list = service.getAllQuizzes ? service.getAllQuizzes() : [];
  return res.json(list);
}

export function getPublicQuestionsHandler(req, res) {
  try {
    const quizId = req.params.quizId;
    const qs = service.getPublicQuestions(quizId);
    return res.json(qs);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

export function submitAnswersHandler(req, res) {
  try {
    const quizId = req.params.quizId;
    const answers = req.body.answers;
    const result = service.scoreSubmission(quizId, answers);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
