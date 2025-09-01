import React, { useState, useEffect } from 'react';
import { QuizQuestion as QuizQuestionType, QuizTheme } from '../types';
import { mergeTheme, validateAnswer } from '../utils/quizUtils';

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentAnswer: string | string[];
  onAnswerChange: (answer: string | string[]) => void;
  theme?: QuizTheme;
  showValidation?: boolean;
  isCompleted?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  theme,
  showValidation = false,
  isCompleted = false
}) => {
  const [localAnswer, setLocalAnswer] = useState<string | string[]>(currentAnswer);
  const mergedTheme = mergeTheme(theme);

  useEffect(() => {
    setLocalAnswer(currentAnswer);
  }, [currentAnswer]);

  const handleAnswerChange = (value: string | string[]) => {
    setLocalAnswer(value);
    onAnswerChange(value);
  };

  const renderMultipleChoice = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {question.options?.map((option) => {
        const isSelected = Array.isArray(localAnswer) 
          ? localAnswer.includes(option.value)
          : localAnswer === option.value;
        
        const isCorrect = showValidation && question.correctAnswer;
        const showCorrect = isCompleted && Array.isArray(question.correctAnswer) 
          ? question.correctAnswer.includes(option.value)
          : question.correctAnswer === option.value;

        return (
          <label
            key={option.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: `2px solid ${
                showCorrect
                  ? '#28a745'
                  : isSelected && !showCorrect
                  ? '#dc3545'
                  : mergedTheme.borderColor
              }`,
              borderRadius: mergedTheme.borderRadius,
              backgroundColor: mergedTheme.backgroundColor,
              cursor: isCompleted ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isCompleted ? 0.8 : 1
            }}
            onMouseEnter={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = mergedTheme.backgroundColor;
              }
            }}
          >
            <input
              type="checkbox"
              checked={Array.isArray(localAnswer) ? localAnswer.includes(option.value) : false}
              onChange={(e) => {
                if (isCompleted) return;
                
                const newAnswer = Array.isArray(localAnswer) ? [...localAnswer] : [];
                if (e.target.checked) {
                  newAnswer.push(option.value);
                } else {
                  const index = newAnswer.indexOf(option.value);
                  if (index > -1) {
                    newAnswer.splice(index, 1);
                  }
                }
                handleAnswerChange(newAnswer);
              }}
              disabled={isCompleted}
              style={{ marginRight: '10px' }}
            />
            <span style={{ color: mergedTheme.textColor }}>
              {option.text}
            </span>
            {showCorrect && (
              <span
                style={{
                  marginLeft: 'auto',
                  color: '#28a745',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </span>
            )}
          </label>
        );
      })}
    </div>
  );

  const renderSingleChoice = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {question.options?.map((option) => {
        const isSelected = localAnswer === option.value;
        const showCorrect = isCompleted && question.correctAnswer === option.value;

        return (
          <label
            key={option.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: `2px solid ${
                showCorrect
                  ? '#28a745'
                  : isSelected && !showCorrect
                  ? '#dc3545'
                  : mergedTheme.borderColor
              }`,
              borderRadius: mergedTheme.borderRadius,
              backgroundColor: mergedTheme.backgroundColor,
              cursor: isCompleted ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isCompleted ? 0.8 : 1
            }}
            onMouseEnter={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = mergedTheme.backgroundColor;
              }
            }}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={localAnswer === option.value}
              onChange={(e) => {
                if (isCompleted) return;
                handleAnswerChange(e.target.value);
              }}
              disabled={isCompleted}
              style={{ marginRight: '10px' }}
            />
            <span style={{ color: mergedTheme.textColor }}>
              {option.text}
            </span>
            {showCorrect && (
              <span
                style={{
                  marginLeft: 'auto',
                  color: '#28a745',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </span>
            )}
          </label>
        );
      })}
    </div>
  );

  const renderBoolean = () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {[
        { value: 'true', label: 'True' },
        { value: 'false', label: 'False' }
      ].map((option) => {
        const isSelected = localAnswer === option.value;
        const showCorrect = isCompleted && question.correctAnswer === option.value;

        return (
          <label
            key={option.value}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
              border: `2px solid ${
                showCorrect
                  ? '#28a745'
                  : isSelected && !showCorrect
                  ? '#dc3545'
                  : mergedTheme.borderColor
              }`,
              borderRadius: mergedTheme.borderRadius,
              backgroundColor: mergedTheme.backgroundColor,
              cursor: isCompleted ? 'default' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isCompleted ? 0.8 : 1
            }}
            onMouseEnter={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCompleted) {
                e.currentTarget.style.backgroundColor = mergedTheme.backgroundColor;
              }
            }}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.value}
              checked={localAnswer === option.value}
              onChange={(e) => {
                if (isCompleted) return;
                handleAnswerChange(e.target.value);
              }}
              disabled={isCompleted}
              style={{ marginRight: '8px' }}
            />
            <span style={{ color: mergedTheme.textColor, fontWeight: 'bold' }}>
              {option.label}
            </span>
            {showCorrect && (
              <span
                style={{
                  marginLeft: '8px',
                  color: '#28a745',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </span>
            )}
          </label>
        );
      })}
    </div>
  );

  const renderText = () => (
    <textarea
      value={typeof localAnswer === 'string' ? localAnswer : ''}
      onChange={(e) => {
        if (isCompleted) return;
        handleAnswerChange(e.target.value);
      }}
      disabled={isCompleted}
      placeholder="Type your answer here..."
      style={{
        width: '100%',
        minHeight: '100px',
        padding: '12px',
        border: `2px solid ${mergedTheme.borderColor}`,
        borderRadius: mergedTheme.borderRadius,
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSize,
        color: mergedTheme.textColor,
        backgroundColor: mergedTheme.backgroundColor,
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.borderColor = mergedTheme.primaryColor;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = mergedTheme.borderColor;
      }}
    />
  );

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'single-choice':
        return renderSingleChoice();
      case 'boolean':
        return renderBoolean();
      case 'text':
        return renderText();
      default:
        return null;
    }
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
      <h3
        style={{
          margin: '0 0 20px 0',
          color: mergedTheme.textColor,
          fontSize: '18px',
          fontWeight: '600'
        }}
      >
        {question.question}
        {question.required && (
          <span style={{ color: '#dc3545', marginLeft: '5px' }}>*</span>
        )}
      </h3>

      {renderQuestionContent()}

      {showValidation && question.explanation && (
        <div
          style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            border: `1px solid ${mergedTheme.borderColor}`,
            borderRadius: mergedTheme.borderRadius,
            color: mergedTheme.textColor
          }}
        >
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}
    </div>
  );
};
