import { 
  shuffleArray, 
  shuffleQuestions, 
  calculateScore, 
  validateAnswer, 
  formatTime, 
  getDefaultTheme, 
  mergeTheme 
} from '../quizUtils';
import { QuizQuestion } from '../../types';

describe('quizUtils', () => {
  describe('shuffleArray', () => {
    it('should return a new array with same elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      
      expect(shuffled).not.toBe(original);
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('should handle empty array', () => {
      const result = shuffleArray([]);
      expect(result).toEqual([]);
    });

    it('should handle single element array', () => {
      const result = shuffleArray([1]);
      expect(result).toEqual([1]);
    });
  });

  describe('shuffleQuestions', () => {
    it('should shuffle questions and options', () => {
      const questions: QuizQuestion[] = [
        {
          id: '1',
          question: 'Test 1',
          type: 'single-choice',
          options: [
            { id: '1a', text: 'A', value: 'a' },
            { id: '1b', text: 'B', value: 'b' }
          ],
          correctAnswer: 'a'
        },
        {
          id: '2',
          question: 'Test 2',
          type: 'single-choice',
          options: [
            { id: '2a', text: 'C', value: 'c' },
            { id: '2b', text: 'D', value: 'd' }
          ],
          correctAnswer: 'c'
        }
      ];

      const shuffled = shuffleQuestions(questions);
      
      expect(shuffled).toHaveLength(questions.length);
      expect(shuffled[0].options).toHaveLength(2);
      expect(shuffled[1].options).toHaveLength(2);
    });
  });

  describe('calculateScore', () => {
    it('should calculate correct score for single choice questions', () => {
      const questions: QuizQuestion[] = [
        {
          id: '1',
          question: 'What is 2+2?',
          type: 'single-choice',
          options: [
            { id: '1a', text: '3', value: '3' },
            { id: '1b', text: '4', value: '4' }
          ],
          correctAnswer: '4',
          points: 10
        }
      ];

      const answers = { '1': '4' };
      const result = calculateScore(questions, answers);

      expect(result.correctAnswers).toBe(1);
      expect(result.totalQuestions).toBe(1);
      expect(result.earnedPoints).toBe(10);
      expect(result.totalPoints).toBe(10);
      expect(result.percentage).toBe(100);
    });

    it('should calculate correct score for multiple choice questions', () => {
      const questions: QuizQuestion[] = [
        {
          id: '1',
          question: 'Select prime numbers',
          type: 'multiple-choice',
          options: [
            { id: '1a', text: '2', value: '2' },
            { id: '1b', text: '3', value: '3' },
            { id: '1c', text: '4', value: '4' }
          ],
          correctAnswer: ['2', '3'],
          points: 15
        }
      ];

      const answers = { '1': ['2', '3'] };
      const result = calculateScore(questions, answers);

      expect(result.correctAnswers).toBe(1);
      expect(result.earnedPoints).toBe(15);
      expect(result.percentage).toBe(100);
    });

    it('should handle incorrect answers', () => {
      const questions: QuizQuestion[] = [
        {
          id: '1',
          question: 'What is 2+2?',
          type: 'single-choice',
          options: [
            { id: '1a', text: '3', value: '3' },
            { id: '1b', text: '4', value: '4' }
          ],
          correctAnswer: '4',
          points: 10
        }
      ];

      const answers = { '1': '3' };
      const result = calculateScore(questions, answers);

      expect(result.correctAnswers).toBe(0);
      expect(result.earnedPoints).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('should handle partial answers', () => {
      const questions: QuizQuestion[] = [
        {
          id: '1',
          question: 'Select prime numbers',
          type: 'multiple-choice',
          options: [
            { id: '1a', text: '2', value: '2' },
            { id: '1b', text: '3', value: '3' },
            { id: '1c', text: '4', value: '4' }
          ],
          correctAnswer: ['2', '3'],
          points: 15
        }
      ];

      const answers = { '1': ['2'] };
      const result = calculateScore(questions, answers);

      expect(result.correctAnswers).toBe(0);
      expect(result.earnedPoints).toBe(0);
      expect(result.percentage).toBe(0);
    });
  });

  describe('validateAnswer', () => {
    it('should validate single choice answers', () => {
      const question: QuizQuestion = {
        id: '1',
        question: 'Test',
        type: 'single-choice',
        options: [
          { id: '1a', text: 'A', value: 'a' },
          { id: '1b', text: 'B', value: 'b' }
        ],
        correctAnswer: 'a'
      };

      expect(validateAnswer(question, 'a')).toBe(true);
      expect(validateAnswer(question, 'b')).toBe(true);
      expect(validateAnswer(question, 'c')).toBe(false);
    });

    it('should validate multiple choice answers', () => {
      const question: QuizQuestion = {
        id: '1',
        question: 'Test',
        type: 'multiple-choice',
        options: [
          { id: '1a', text: 'A', value: 'a' },
          { id: '1b', text: 'B', value: 'b' }
        ],
        correctAnswer: ['a', 'b']
      };

      expect(validateAnswer(question, ['a'])).toBe(true);
      expect(validateAnswer(question, ['a', 'b'])).toBe(true);
      expect(validateAnswer(question, ['c'])).toBe(false);
      expect(validateAnswer(question, [])).toBe(false);
    });

    it('should handle required questions', () => {
      const question: QuizQuestion = {
        id: '1',
        question: 'Test',
        type: 'single-choice',
        options: [
          { id: '1a', text: 'A', value: 'a' }
        ],
        correctAnswer: 'a',
        required: true
      };

      expect(validateAnswer(question, 'a')).toBe(true);
      expect(validateAnswer(question, '')).toBe(false);
    });
  });

  describe('formatTime', () => {
    it('should format seconds correctly', () => {
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
    });
  });

  describe('getDefaultTheme', () => {
    it('should return default theme object', () => {
      const theme = getDefaultTheme();
      
      expect(theme).toHaveProperty('primaryColor');
      expect(theme).toHaveProperty('backgroundColor');
      expect(theme).toHaveProperty('textColor');
      expect(theme).toHaveProperty('borderRadius');
      expect(theme).toHaveProperty('fontFamily');
      expect(theme).toHaveProperty('fontSize');
    });
  });

  describe('mergeTheme', () => {
    it('should merge custom theme with defaults', () => {
      const customTheme = {
        primaryColor: '#ff0000',
        fontSize: '18px'
      };

      const merged = mergeTheme(customTheme);
      
      expect(merged.primaryColor).toBe('#ff0000');
      expect(merged.fontSize).toBe('18px');
      expect(merged.backgroundColor).toBe(getDefaultTheme().backgroundColor);
    });

    it('should handle empty custom theme', () => {
      const merged = mergeTheme({});
      expect(merged).toEqual(getDefaultTheme());
    });

    it('should handle undefined values', () => {
      const customTheme = {
        primaryColor: undefined,
        fontSize: '18px'
      };

      const merged = mergeTheme(customTheme);
      
      expect(merged.primaryColor).toBe(getDefaultTheme().primaryColor);
      expect(merged.fontSize).toBe('18px');
    });
  });
});
