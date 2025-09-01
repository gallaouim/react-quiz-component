
import React, { useEffect, useState } from 'react';
import { QuizTheme } from '../types';
import { mergeTheme, formatTime } from '../utils/quizUtils';

interface QuizTimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  theme?: QuizTheme;
  isActive: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({
  timeLimit,
  onTimeUp,
  theme,
  isActive
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const mergedTheme = mergeTheme(theme);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const percentage = (timeLeft / timeLimit) * 100;
  const isWarning = timeLeft <= timeLimit * 0.2; // Warning when 20% time left
  const isCritical = timeLeft <= timeLimit * 0.1; // Critical when 10% time left

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        backgroundColor: mergedTheme.backgroundColor,
        border: `1px solid ${mergedTheme.borderColor}`,
        borderRadius: mergedTheme.borderRadius,
        fontFamily: mergedTheme.fontFamily,
        fontSize: mergedTheme.fontSize
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${mergedTheme.borderColor}`,
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${
              isCritical
                ? '#dc3545'
                : isWarning
                ? '#ffc107'
                : mergedTheme.primaryColor
            } ${percentage * 3.6}deg, transparent 0deg)`,
            transition: 'background 0.3s ease'
          }}
        />
      </div>
      
      <span
        style={{
          color: isCritical
            ? '#dc3545'
            : isWarning
            ? '#ffc107'
            : mergedTheme.textColor,
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        {formatTime(timeLeft)}
      </span>
      
      {isWarning && (
        <span
          style={{
            color: isCritical ? '#dc3545' : '#ffc107',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {isCritical ? 'Time almost up!' : 'Hurry up!'}
        </span>
      )}
    </div>
  );
};
