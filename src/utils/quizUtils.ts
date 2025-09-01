
import { QuizQuestion, QuizAnswer, QuizResult, QuizOption } from '../types';

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * 
 * @param array - The array to shuffle
 * @returns A new shuffled array
 * 
 * @example
 * ```ts
 * const shuffled = shuffleArray([1, 2, 3, 4, 5]);
 * // Result: [3, 1, 5, 2, 4] (random order)
 * ```
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Shuffles questions and their options for randomization.
 * 
 * @param questions - Array of quiz questions to shuffle
 * @returns New array with shuffled questions and options
 * 
 * @example
 * ```ts
 * const shuffledQuestions = shuffleQuestions(questions);
 * ```
 */
export const shuffleQuestions = (questions: QuizQuestion[]): QuizQuestion[] => {
  return shuffleArray(questions).map(question => ({
    ...question,
    options: question.options ? shuffleArray(question.options) : question.options
  }));
};

/**
 * Calculates the quiz score based on answers and correct answers.
 * 
 * @param questions - Array of quiz questions
 * @param answers - Object containing user answers
 * @returns Quiz result with score, percentage, and detailed breakdown
 * 
 * @example
 * ```ts
 * const result = calculateScore(questions, userAnswers);
 * console.log(`Score: ${result.percentage}%`);
 * ```
 */
export const calculateScore = (
  questions: QuizQuestion[],
  answers: Record<string, string | string[]>
): QuizResult => {
  let correctAnswers = 0;
  let totalPoints = 0;
  let earnedPoints = 0;
  const quizAnswers: QuizAnswer[] = [];

  questions.forEach(question => {
    const answer = answers[question.id];
    const questionPoints = question.points || 1;
    totalPoints += questionPoints;

    if (answer && question.correctAnswer) {
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        const userAnswers = Array.isArray(answer) ? answer : [answer];
        const correctAnswersArray = Array.isArray(question.correctAnswer) 
          ? question.correctAnswer 
          : [question.correctAnswer];
        
        isCorrect = userAnswers.length === correctAnswersArray.length &&
          userAnswers.every(ans => correctAnswersArray.includes(ans));
      } else {
        isCorrect = answer === question.correctAnswer;
      }

      if (isCorrect) {
        correctAnswers++;
        earnedPoints += questionPoints;
      }

      quizAnswers.push({
        questionId: question.id,
        answer,
        isCorrect,
        points: isCorrect ? questionPoints : 0
      });
    } else {
      quizAnswers.push({
        questionId: question.id,
        answer: answer || '',
        isCorrect: false,
        points: 0
      });
    }
  });

  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  return {
    totalQuestions: questions.length,
    correctAnswers,
    totalPoints,
    earnedPoints,
    percentage,
    answers: quizAnswers
  };
};

export const validateAnswer = (
  question: QuizQuestion,
  answer: string | string[]
): boolean => {
  if (!answer || (Array.isArray(answer) && answer.length === 0)) {
    return false;
  }

  if (question.required && !answer) {
    return false;
  }

  if (question.type === 'multiple-choice') {
    const userAnswers = Array.isArray(answer) ? answer : [answer];
    return userAnswers.length > 0 && userAnswers.every(ans => 
      question.options?.some(option => option.value === ans)
    );
  }

  if (question.type === 'single-choice') {
    return question.options?.some(option => option.value === answer) || false;
  }

  return true;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getDefaultTheme = (): Record<string, string> => ({
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#dee2e6',
  borderRadius: '8px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px'
});

export const mergeTheme = (customTheme: Partial<Record<string, string>> = {}): Record<string, string> => {
  const defaultTheme = getDefaultTheme();
  const merged = { ...defaultTheme };
  
  Object.entries(customTheme).forEach(([key, value]) => {
    if (value !== undefined) {
      merged[key] = value;
    }
  });
  
  return merged;
};
