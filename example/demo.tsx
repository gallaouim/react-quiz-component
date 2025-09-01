import React, { useState } from 'react';
import { Quiz, QuizQuestion, QuizResult } from '../src';

const sampleQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    type: 'single-choice',
    options: [
      { id: '1a', text: 'London', value: 'london' },
      { id: '1b', text: 'Paris', value: 'paris' },
      { id: '1c', text: 'Berlin', value: 'berlin' },
      { id: '1d', text: 'Madrid', value: 'madrid' }
    ],
    correctAnswer: 'paris',
    points: 10,
    explanation: 'Paris is the capital and largest city of France.'
  },
  {
    id: '2',
    question: 'Which of the following are programming languages?',
    type: 'multiple-choice',
    options: [
      { id: '2a', text: 'JavaScript', value: 'javascript' },
      { id: '2b', text: 'Python', value: 'python' },
      { id: '2c', text: 'HTML', value: 'html' },
      { id: '2d', text: 'CSS', value: 'css' },
      { id: '2e', text: 'React', value: 'react' }
    ],
    correctAnswer: ['javascript', 'python'],
    points: 15,
    explanation: 'JavaScript and Python are programming languages. HTML and CSS are markup languages, and React is a JavaScript library.'
  },
  {
    id: '3',
    question: 'Is the Earth round?',
    type: 'boolean',
    correctAnswer: 'true',
    points: 5,
    explanation: 'Yes, the Earth is approximately spherical in shape.'
  },
  {
    id: '4',
    question: 'What is 2 + 2?',
    type: 'single-choice',
    options: [
      { id: '4a', text: '3', value: '3' },
      { id: '4b', text: '4', value: '4' },
      { id: '4c', text: '5', value: '5' },
      { id: '4d', text: '6', value: '6' }
    ],
    correctAnswer: '4',
    points: 10,
    explanation: '2 + 2 = 4'
  },
  {
    id: '5',
    question: 'Tell us about your favorite programming language and why you like it.',
    type: 'text',
    required: true,
    points: 20
  },
  {
    id: '6',
    question: 'Which of these are JavaScript frameworks?',
    type: 'multiple-choice',
    options: [
      { id: '6a', text: 'React', value: 'react' },
      { id: '6b', text: 'Vue', value: 'vue' },
      { id: '6c', text: 'Angular', value: 'angular' },
      { id: '6d', text: 'jQuery', value: 'jquery' },
      { id: '6e', text: 'Bootstrap', value: 'bootstrap' }
    ],
    correctAnswer: ['react', 'vue', 'angular'],
    points: 15,
    explanation: 'React, Vue, and Angular are JavaScript frameworks. jQuery is a JavaScript library, and Bootstrap is a CSS framework.'
  }
];

const Demo: React.FC = () => {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setShowResults(true);
    console.log('Quiz completed!', result);
  };

  const handleRetry = () => {
    setQuizResult(null);
    setShowResults(false);
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        React Quiz Component Demo
      </h1>
      
      {!showResults ? (
        <Quiz
          questions={sampleQuestions}
          onComplete={handleQuizComplete}
          config={{
            title: 'Programming Knowledge Quiz',
            description: 'Test your knowledge about programming and technology!',
            showProgress: true,
            showTimer: true,
            timeLimit: 600, // 10 minutes
            allowRetry: true,
            showResults: true,
            showExplanations: true,
            passPercentage: 70,
            shuffleQuestions: true,
            shuffleOptions: true
          }}
          theme={{
            primaryColor: '#007bff',
            secondaryColor: '#6c757d',
            backgroundColor: '#ffffff',
            textColor: '#333333',
            borderColor: '#dee2e6',
            borderRadius: '8px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px'
          }}
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px'
          }}
        />
      ) : (
        <div>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
            Quiz Results
          </h2>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>Summary:</h3>
            <p><strong>Score:</strong> {quizResult?.percentage}%</p>
            <p><strong>Correct Answers:</strong> {quizResult?.correctAnswers}/{quizResult?.totalQuestions}</p>
            <p><strong>Points Earned:</strong> {quizResult?.earnedPoints}/{quizResult?.totalPoints}</p>
            {quizResult?.timeSpent && (
              <p><strong>Time Spent:</strong> {Math.floor(quizResult.timeSpent / 60)}m {quizResult.timeSpent % 60}s</p>
            )}
          </div>
          <button
            onClick={handleRetry}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'block',
              margin: '0 auto'
            }}
          >
            Take Quiz Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Demo;
