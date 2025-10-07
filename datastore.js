import { v4 as uuidv4 } from 'uuid';

const quizzes = new Map();
const questions = new Map();

export function createQuiz(title) {
  const id = uuidv4();
  quizzes.set(id, { id, title, questionIds: [] });
  return quizzes.get(id);
}

export function getQuiz(id) {
  return quizzes.get(id) || null;
}

export function getAllQuizzes() {
  return Array.from(quizzes.values());
}

export function createQuestion(quizId, payload) {
  const id = uuidv4();
  const question = { id, quizId, ...payload };
  questions.set(id, question);
  const q = quizzes.get(quizId);
  if (q) q.questionIds.push(id);
  return question;
}

export function getQuestionsForQuiz(quizId) {
  const q = quizzes.get(quizId);
  if (!q) return null;
  return q.questionIds.map(id => questions.get(id));
}

export function clearAll() {
  quizzes.clear();
  questions.clear();
}
