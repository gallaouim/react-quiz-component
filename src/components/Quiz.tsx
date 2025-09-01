import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  QuizComponentProps, 
  QuizState, 
  QuizResult, 
  QuizQuestion as QuizQuestionType 
} from '../types';
import { 
  shuffleQuestions, 
  calculateScore, 
  validateAnswer,
  mergeTheme 
} from '../utils/quizUtils';
import { QuizProgress } from './QuizProgress';
import { QuizTimer } from './QuizTimer';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';

/**
 * Main Quiz component that provides a complete quiz experience with customizable
 * appearance, behavior, and question types.
 * 
 * @param props - Component props
 * @param props.questions - Array of quiz questions
 * @param props.config - Quiz configuration options
 * @param props.theme - Custom theme configuration
 * @param props.onComplete - Callback when quiz is completed
 * @param props.onAnswerChange - Callback when an answer changes
 * @param props.onQuestionChange - Callback when question changes
 * @param props.className - Custom CSS class name
 * @param props.style - Custom inline styles
 * 
 * @example
 * ```tsx
 * <Quiz
 *   questions={questions}
 *   config={{
 *     title: 'My Quiz',
 *     showProgress: true,
 *     timeLimit: 300
 *   }}
 *   onComplete={(result) => console.log('Score:', result.percentage)}
 * />
 * ```
 */
export const Quiz: React.FC<QuizComponentProps> = ({
  questions,
  config = {},
  theme,
  onComplete,
  onAnswerChange,
  onQuestionChange,
  className,
  style
}) => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isCompleted: false,
    isStarted: false
  });

  const mergedTheme = mergeTheme(theme);
  const processedQuestions = useMemo(() => {
    let processed = [...questions];
    if (config.shuffleQuestions) {
      processed = shuffleQuestions(processed);
    }
    return processed;
  }, [questions, config.shuffleQuestions]);

  const currentQuestion = processedQuestions[state.currentQuestionIndex];
  const totalQuestions = processedQuestions.length;
  const answeredQuestions = useMemo(() => {
    return new Set(Object.keys(state.answers));
  }, [state.answers]);

  const handleStart = useCallback(() => {
    setState(prev => ({
      ...prev,
      isStarted: true,
      startTime: Date.now()
    }));
  }, []);

  const handleAnswerChange = useCallback((questionId: string, answer: string | string[]) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));

    onAnswerChange?.(questionId, answer);
  }, [onAnswerChange]);

  const handleNext = useCallback(() => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      handleComplete();
    }
  }, [state.currentQuestionIndex, totalQuestions]);

  const handlePrevious = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  }, [state.currentQuestionIndex]);

  const handleQuestionClick = useCallback((questionIndex: number) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: questionIndex
    }));
  }, []);

  const handleComplete = useCallback(() => {
    const endTime = Date.now();
    const timeSpent = state.startTime ? Math.floor((endTime - state.startTime) / 1000) : undefined;
    
    const result = calculateScore(processedQuestions, state.answers);
    if (timeSpent) {
      result.timeSpent = timeSpent;
    }

    setState(prev => ({
      ...prev,
      isCompleted: true,
      endTime
    }));

    onComplete?.(result);
  }, [processedQuestions, state.answers, state.startTime, onComplete]);

  const handleTimeUp = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  const handleRetry = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
      isStarted: false
    });
  }, []);

  const canProceed = useMemo(() => {
    if (!currentQuestion) return false;
    return validateAnswer(currentQuestion, state.answers[currentQuestion.id] || '');
  }, [currentQuestion, state.answers]);

  const isLastQuestion = state.currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrent = currentQuestion && state.answers[currentQuestion.id];

  useEffect(() => {
    onQuestionChange?.(state.currentQuestionIndex + 1, totalQuestions);
  }, [state.currentQuestionIndex, totalQuestions, onQuestionChange]);

  // Auto-complete if all questions are answered
  useEffect(() => {
    if (state.isStarted && !state.isCompleted && Object.keys(state.answers).length === totalQuestions) {
      const allAnswered = processedQuestions.every(question => 
        validateAnswer(question, state.answers[question.id] || '')
      );
      if (allAnswered) {
        handleComplete();
      }
    }
  }, [state.answers, state.isStarted, state.isCompleted, totalQuestions, processedQuestions, handleComplete]);

  if (!state.isStarted) {
    return (
      <div
        className={className}
        style={{
          padding: '30px',
          backgroundColor: mergedTheme.backgroundColor,
          border: `1px solid ${mergedTheme.borderColor}`,
          borderRadius: mergedTheme.borderRadius,
          fontFamily: mergedTheme.fontFamily,
          fontSize: mergedTheme.fontSize,
          ...style
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: mergedTheme.textColor, marginBottom: '15px' }}>
            {config.title || 'Quiz'}
          </h2>
          {config.description && (
            <p style={{ color: mergedTheme.textColor, marginBottom: '20px' }}>
              {config.description}
            </p>
          )}
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <h3 style={{ color: mergedTheme.textColor, marginBottom: '10px' }}>Quiz Information:</h3>
            <ul style={{ color: mergedTheme.textColor, margin: 0, paddingLeft: '20px' }}>
              <li>Total Questions: {totalQuestions}</li>
              {config.timeLimit && <li>Time Limit: {Math.floor(config.timeLimit / 60)} minutes</li>}
              {config.passPercentage && <li>Passing Score: {config.passPercentage}%</li>}
            </ul>
          </div>
          <button
            onClick={handleStart}
            style={{
              padding: '15px 30px',
              backgroundColor: mergedTheme.primaryColor,
              color: '#ffffff',
              border: 'none',
              borderRadius: mergedTheme.borderRadius,
              fontSize: mergedTheme.fontSize,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = mergedTheme.primaryColor;
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (state.isCompleted) {
    const result = calculateScore(processedQuestions, state.answers);
    if (state.startTime && state.endTime) {
      result.timeSpent = Math.floor((state.endTime - state.startTime) / 1000);
    }

    return (
      <QuizResults
        result={result}
        questions={processedQuestions}
        theme={theme}
        onRetry={config.allowRetry ? handleRetry : undefined}
        showExplanations={config.showExplanations}
        passPercentage={config.passPercentage}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: mergedTheme.backgroundColor,
        border: `1px solid ${mergedTheme.borderColor}`,
        borderRadius: mergedTheme.borderRadius,
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSize,
        ...style
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px',
          borderBottom: `1px solid ${mergedTheme.borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div>
          <h2 style={{ color: mergedTheme.textColor, margin: 0 }}>
            {config.title || 'Quiz'}
          </h2>
          {config.description && (
            <p style={{ color: mergedTheme.secondaryColor, margin: '5px 0 0 0' }}>
              {config.description}
            </p>
          )}
        </div>
        
        {config.showTimer && config.timeLimit && (
          <QuizTimer
            timeLimit={config.timeLimit}
            onTimeUp={handleTimeUp}
            theme={theme}
            isActive={state.isStarted && !state.isCompleted}
          />
        )}
      </div>

      {/* Progress */}
      {config.showProgress && (
        <div style={{ padding: '20px 20px 0 20px' }}>
          <QuizProgress
            currentQuestion={state.currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            theme={theme}
            onQuestionClick={handleQuestionClick}
            answeredQuestions={answeredQuestions}
          />
        </div>
      )}

      {/* Question */}
      <div style={{ padding: '0 20px 20px 20px' }}>
        <QuizQuestion
          question={currentQuestion}
          currentAnswer={state.answers[currentQuestion.id] || ''}
          onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          theme={theme}
          showValidation={false}
          isCompleted={false}
        />
      </div>

      {/* Navigation */}
      <div
        style={{
          padding: '20px',
          borderTop: `1px solid ${mergedTheme.borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={state.currentQuestionIndex === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: state.currentQuestionIndex === 0 ? mergedTheme.secondaryColor : mergedTheme.primaryColor,
            color: '#ffffff',
            border: 'none',
            borderRadius: mergedTheme.borderRadius,
            fontSize: mergedTheme.fontSize,
            cursor: state.currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: state.currentQuestionIndex === 0 ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          Previous
        </button>

        <div style={{ color: mergedTheme.textColor }}>
          {state.currentQuestionIndex + 1} of {totalQuestions}
        </div>

        <button
          onClick={isLastQuestion ? handleComplete : handleNext}
          disabled={!canProceed}
          style={{
            padding: '10px 20px',
            backgroundColor: canProceed ? mergedTheme.primaryColor : mergedTheme.secondaryColor,
            color: '#ffffff',
            border: 'none',
            borderRadius: mergedTheme.borderRadius,
            fontSize: mergedTheme.fontSize,
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.6,
            transition: 'all 0.2s ease'
          }}
        >
          {isLastQuestion ? 'Complete Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};
