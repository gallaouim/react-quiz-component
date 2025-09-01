export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'single-choice' | 'text' | 'boolean';
  options?: QuizOption[];
  correctAnswer?: string | string[];
  explanation?: string;
  points?: number;
  required?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
  isCorrect?: boolean;
  points?: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  answers: QuizAnswer[];
  timeSpent?: number;
}

export interface QuizConfig {
  title?: string;
  description?: string;
  shuffleQuestions?: boolean;
  shuffleOptions?: boolean;
  showProgress?: boolean;
  showTimer?: boolean;
  timeLimit?: number; // in seconds
  allowRetry?: boolean;
  showResults?: boolean;
  showExplanations?: boolean;
  passPercentage?: number;
}

export interface QuizTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
  [key: string]: string | undefined;
}

export interface QuizComponentProps {
  questions: QuizQuestion[];
  config?: QuizConfig;
  theme?: QuizTheme;
  onComplete?: (result: QuizResult) => void;
  onAnswerChange?: (questionId: string, answer: string | string[]) => void;
  onQuestionChange?: (currentQuestion: number, totalQuestions: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  isCompleted: boolean;
  startTime?: number;
  endTime?: number;
  isStarted: boolean;
}
