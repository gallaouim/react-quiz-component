import React from 'react';
import { QuizResult, QuizQuestion, QuizTheme } from '../types';
import { mergeTheme, formatTime } from '../utils/quizUtils';

interface QuizResultsProps {
  result: QuizResult;
  questions: QuizQuestion[];
  theme?: QuizTheme;
  onRetry?: () => void;
  showExplanations?: boolean;
  passPercentage?: number;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  questions,
  theme,
  onRetry,
  showExplanations = false,
  passPercentage = 70
}) => {
  const mergedTheme = mergeTheme(theme);
  const isPassed = result.percentage >= passPercentage;

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: mergedTheme.backgroundColor,
        border: `1px solid ${mergedTheme.borderColor}`,
        borderRadius: mergedTheme.borderRadius,
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSize
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: isPassed ? '#d4edda' : '#f8d7da',
          border: `1px solid ${isPassed ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: mergedTheme.borderRadius,
          color: isPassed ? '#155724' : '#721c24'
        }}
      >
        <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
          {isPassed ? '🎉 Congratulations!' : '😔 Better luck next time!'}
        </h2>
        <p style={{ margin: '0', fontSize: '16px' }}>
          {isPassed 
            ? `You passed with ${result.percentage}%` 
            : `You scored ${result.percentage}% (${passPercentage}% required to pass)`
          }
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}
      >
        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: `1px solid ${mergedTheme.borderColor}`,
            borderRadius: mergedTheme.borderRadius,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: mergedTheme.primaryColor }}>
            {result.correctAnswers}/{result.totalQuestions}
          </div>
          <div style={{ color: mergedTheme.textColor }}>Correct Answers</div>
        </div>

        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: `1px solid ${mergedTheme.borderColor}`,
            borderRadius: mergedTheme.borderRadius,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: mergedTheme.primaryColor }}>
            {result.percentage}%
          </div>
          <div style={{ color: mergedTheme.textColor }}>Score</div>
        </div>

        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: `1px solid ${mergedTheme.borderColor}`,
            borderRadius: mergedTheme.borderRadius,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: mergedTheme.primaryColor }}>
            {getGrade(result.percentage)}
          </div>
          <div style={{ color: mergedTheme.textColor }}>Grade</div>
        </div>

        <div
          style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            border: `1px solid ${mergedTheme.borderColor}`,
            borderRadius: mergedTheme.borderRadius,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: mergedTheme.primaryColor }}>
            {result.earnedPoints}/{result.totalPoints}
          </div>
          <div style={{ color: mergedTheme.textColor }}>Points</div>
        </div>

        {result.timeSpent && (
          <div
            style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              border: `1px solid ${mergedTheme.borderColor}`,
              borderRadius: mergedTheme.borderRadius,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: mergedTheme.primaryColor }}>
              {formatTime(result.timeSpent)}
            </div>
            <div style={{ color: mergedTheme.textColor }}>Time Spent</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            color: mergedTheme.textColor
          }}
        >
          <span>Your Score</span>
          <span>{result.percentage}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: mergedTheme.borderColor,
            borderRadius: '5px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${result.percentage}%`,
              height: '100%',
              backgroundColor: isPassed ? '#28a745' : '#dc3545',
              transition: 'width 0.5s ease'
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '5px',
            fontSize: '12px',
            color: mergedTheme.secondaryColor
          }}
        >
          <span>0%</span>
          <span>Passing Score: {passPercentage}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Answer Review */}
      {showExplanations && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: mergedTheme.textColor, marginBottom: '15px' }}>
            Answer Review
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {result.answers.map((answer, index) => {
              const question = questions.find(q => q.id === answer.questionId);
              if (!question) return null;

              return (
                <div
                  key={answer.questionId}
                  style={{
                    padding: '15px',
                    border: `1px solid ${answer.isCorrect ? '#c3e6cb' : '#f5c6cb'}`,
                    borderRadius: mergedTheme.borderRadius,
                    backgroundColor: answer.isCorrect ? '#d4edda' : '#f8d7da'
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <strong style={{ color: mergedTheme.textColor }}>
                      Question {index + 1}:
                    </strong>{' '}
                    <span style={{ color: mergedTheme.textColor }}>
                      {question.question}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '5px' }}>
                    <strong style={{ color: mergedTheme.textColor }}>Your Answer:</strong>{' '}
                    <span style={{ color: answer.isCorrect ? '#155724' : '#721c24' }}>
                      {Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer}
                    </span>
                  </div>

                  {question.correctAnswer && (
                    <div style={{ marginBottom: '5px' }}>
                      <strong style={{ color: mergedTheme.textColor }}>Correct Answer:</strong>{' '}
                      <span style={{ color: '#155724' }}>
                        {Array.isArray(question.correctAnswer) 
                          ? question.correctAnswer.join(', ') 
                          : question.correctAnswer}
                      </span>
                    </div>
                  )}

                  {question.explanation && (
                    <div style={{ marginTop: '10px', fontSize: '14px' }}>
                      <strong style={{ color: mergedTheme.textColor }}>Explanation:</strong>{' '}
                      <span style={{ color: mergedTheme.textColor }}>
                        {question.explanation}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '12px',
                      color: mergedTheme.secondaryColor
                    }}
                  >
                    Points: {answer.points || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ textAlign: 'center' }}>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: '12px 24px',
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
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
