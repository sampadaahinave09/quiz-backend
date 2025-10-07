import { v4 as uuidv4 } from 'uuid';

export function validateCreateQuiz(req, res, next) {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  next();
}

export function validateAddQuestion(req, res, next) {
  const { type, text, options, correctOptionIds, correctText } = req.body;
  const allowed = ['single', 'multiple', 'text'];
  if (!type || !allowed.includes(type))
    return res.status(400).json({ error: `type must be one of ${allowed.join(',')}` });
  if (!text || typeof text !== 'string' || !text.trim())
    return res.status(400).json({ error: 'question text required' });

  if (type === 'single' || type === 'multiple') {
    if (!Array.isArray(options) || options.length < 2)
      return res.status(400).json({ error: 'at least two options required' });
    const normalizedOptions = options.map(o => ({ id: o.id || uuidv4(), text: o.text }));
    req.body.options = normalizedOptions;

    if (!Array.isArray(correctOptionIds) || correctOptionIds.length === 0)
      return res.status(400).json({ error: 'correctOptionIds required' });
  }

  if (type === 'text') {
    if (!correctText || typeof correctText !== 'string')
      return res.status(400).json({ error: 'correctText required' });
    if (correctText.length > 300)
      return res.status(400).json({ error: 'correctText too long' });
  }

  next();
}

export function validateSubmission(req, res, next) {
  const { answers } = req.body;
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers must be array' });
  next();
}
