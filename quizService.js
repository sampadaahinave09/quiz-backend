import * as store from '../models/dataStore.js';

export function createQuiz(title) {
  if (!title || typeof title !== 'string') throw new Error('title required');
  return store.createQuiz(title.trim());
}

export function addQuestion(quizId, payload) {
  const quiz = store.getQuiz(quizId);
  if (!quiz) throw new Error('quiz not found');
  return store.createQuestion(quizId, payload);
}

export function getPublicQuestions(quizId) {
  const list = store.getQuestionsForQuiz(quizId);
  if (list === null) throw new Error('quiz not found');
  return list.map(q => {
    const { correctOptionIds, correctText, ...rest } = q;
    const options = (rest.options || []).map(o => ({ id: o.id, text: o.text }));
    return { id: rest.id, type: rest.type, text: rest.text, options };
  });
}

export function scoreSubmission(quizId, answers) {
  const list = store.getQuestionsForQuiz(quizId);
  if (list === null) throw new Error('quiz not found');

  const qmap = new Map(list.map(q => [q.id, q]));
  let score = 0;
  let total = list.length;

  for (const ans of answers) {
    const q = qmap.get(ans.questionId);
    if (!q) continue;

    if (q.type === 'single') {
      const selected = ans.selectedOptionIds?.[0];
      if (selected && q.correctOptionIds?.[0] === selected) score += 1;
    } else if (q.type === 'multiple') {
      const sel = [...new Set(ans.selectedOptionIds || [])];
      const correct = q.correctOptionIds || [];
      if (sel.length === correct.length && sel.every(id => correct.includes(id))) score += 1;
    } else if (q.type === 'text') {
      const provided = (ans.answerText || '').trim().toLowerCase();
      const correctText = (q.correctText || '').trim().toLowerCase();
      if (provided && provided === correctText) score += 1;
    }
  }

  return { score, total };
}
