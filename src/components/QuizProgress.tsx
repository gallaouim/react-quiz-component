import React from 'react';
import { QuizTheme } from '../types';
import { mergeTheme } from '../utils/quizUtils';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  theme?: QuizTheme;
  onQuestionClick?: (questionIndex: number) => void;
  answeredQuestions: Set<string>;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  theme,
  onQuestionClick,
  answeredQuestions
}) => {
  const mergedTheme = mergeTheme(theme);

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div
      style={{
        marginBottom: '20px',
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSize
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <span style={{ color: mergedTheme.textColor }}>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span style={{ color: mergedTheme.secondaryColor }}>
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: mergedTheme.borderColor,
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: mergedTheme.primaryColor,
            transition: 'width 0.3s ease'
          }}
        />
      </div>

      {onQuestionClick && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '15px'
          }}
        >
          {Array.from({ length: totalQuestions }, (_, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(index)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `2px solid ${
                  index === currentQuestion - 1
                    ? mergedTheme.primaryColor
                    : answeredQuestions.has(`question-${index}`)
                    ? mergedTheme.secondaryColor
                    : mergedTheme.borderColor
                }`,
                backgroundColor:
                  index === currentQuestion - 1
                    ? mergedTheme.primaryColor
                    : answeredQuestions.has(`question-${index}`)
                    ? mergedTheme.secondaryColor
                    : mergedTheme.backgroundColor,
                color: index === currentQuestion - 1 ? '#ffffff' : mergedTheme.textColor,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
