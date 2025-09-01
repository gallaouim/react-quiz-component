# React Quiz Component

A highly customizable and flexible quiz component for React applications. Built with TypeScript and optimized for performance.

## 🚀 Quick Start

```bash
npm install react-quiz-component
```

```tsx
import { Quiz, QuizQuestion } from 'react-quiz-component';

const questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    type: 'single-choice',
    options: [
      { id: '1a', text: 'London', value: 'london' },
      { id: '1b', text: 'Paris', value: 'paris' },
      { id: '1c', text: 'Berlin', value: 'berlin' }
    ],
    correctAnswer: 'paris',
    points: 10
  }
];

function App() {
  return (
    <Quiz
      questions={questions}
      config={{
        title: 'My Quiz',
        showProgress: true,
        showTimer: true,
        timeLimit: 300
      }}
      onComplete={(result) => console.log('Quiz completed!', result)}
    />
  );
}
```

## Features

- 🎯 **Multiple Question Types**: Single choice, multiple choice, boolean, and text questions
- 🎨 **Fully Customizable**: Theme support with custom colors, fonts, and styling
- ⏱️ **Timer Support**: Optional time limits with visual countdown
- 📊 **Progress Tracking**: Visual progress indicators and question navigation
- 🎯 **Scoring System**: Points-based scoring with percentage calculations
- 📝 **Answer Validation**: Built-in validation for all question types
- 🔄 **Retry Functionality**: Option to retake quizzes
- 📱 **Responsive Design**: Works on all screen sizes
- 🚀 **Performance Optimized**: Built with React hooks and memoization
- 📦 **TypeScript Support**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install react-quiz-component
# or
yarn add react-quiz-component
```

## 🎯 Live Demo

Try the interactive demo to see all customization options in action:

[Open Developer Demo](developer-demo.html)

The demo shows:
- **Real-time configuration** - Change settings and see immediate updates
- **Theme customization** - 5 pre-built themes + custom colors
- **Behavior toggles** - Enable/disable features instantly
- **Code generation** - Get the exact code for your configuration
- **Multiple question sets** - Programming, Math, Science examples

```tsx
import React from 'react';
import { Quiz, QuizQuestion } from 'react-quiz-component';

const questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    type: 'single-choice',
    options: [
      { id: '1a', text: 'London', value: 'london' },
      { id: '1b', text: 'Paris', value: 'paris' },
      { id: '1c', text: 'Berlin', value: 'berlin' }
    ],
    correctAnswer: 'paris',
    points: 10
  },
  {
    id: '2',
    question: 'Which programming languages are object-oriented?',
    type: 'multiple-choice',
    options: [
      { id: '2a', text: 'Java', value: 'java' },
      { id: '2b', text: 'Python', value: 'python' },
      { id: '2c', text: 'C++', value: 'cpp' },
      { id: '2d', text: 'Assembly', value: 'assembly' }
    ],
    correctAnswer: ['java', 'python', 'cpp'],
    points: 15
  }
];

function App() {
  const handleQuizComplete = (result) => {
    console.log('Quiz completed!', result);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Quiz
        questions={questions}
        onComplete={handleQuizComplete}
        config={{
          title: 'My Quiz',
          description: 'Test your knowledge!',
          showProgress: true,
          showTimer: true,
          timeLimit: 300, // 5 minutes
          allowRetry: true,
          showResults: true,
          showExplanations: true,
          passPercentage: 70
        }}
      />
    </div>
  );
}

export default App;
```

## 📚 API Reference

### Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `questions` | `QuizQuestion[]` | ✅ | - | Array of quiz questions |
| `config` | `QuizConfig` | ❌ | `{}` | Quiz behavior configuration |
| `theme` | `QuizTheme` | ❌ | `default` | Visual theme customization |
| `onComplete` | `(result: QuizResult) => void` | ❌ | - | Quiz completion callback |
| `onAnswerChange` | `(questionId: string, answer: string \| string[]) => void` | ❌ | - | Answer change callback |
| `onQuestionChange` | `(currentQuestion: number, totalQuestions: number) => void` | ❌ | - | Question navigation callback |
| `className` | `string` | ❌ | - | Custom CSS class name |
| `style` | `React.CSSProperties` | ❌ | - | Custom inline styles |

### Question Types

#### Single Choice
```tsx
{
  id: '1',
  question: 'What is 2 + 2?',
  type: 'single-choice',
  options: [
    { id: '1a', text: '3', value: '3' },
    { id: '1b', text: '4', value: '4' },
    { id: '1c', text: '5', value: '5' }
  ],
  correctAnswer: '4',
  points: 10,
  explanation: '2 + 2 equals 4'
}
```

#### Multiple Choice
```tsx
{
  id: '2',
  question: 'Select all prime numbers:',
  type: 'multiple-choice',
  options: [
    { id: '2a', text: '2', value: '2' },
    { id: '2b', text: '3', value: '3' },
    { id: '2c', text: '4', value: '4' },
    { id: '2d', text: '5', value: '5' }
  ],
  correctAnswer: ['2', '3', '5'],
  points: 15
}
```

#### Boolean
```tsx
{
  id: '3',
  question: 'Is the Earth round?',
  type: 'boolean',
  correctAnswer: 'true',
  points: 5
}
```

#### Text
```tsx
{
  id: '4',
  question: 'What is your favorite color?',
  type: 'text',
  required: true,
  points: 5
}
```

### Configuration Options

```tsx
const config: QuizConfig = {
  // Basic Settings
  title: 'My Quiz',                    // Quiz title
  description: 'Test your knowledge',  // Quiz description
  
  // Behavior Settings
  shuffleQuestions: true,              // Randomize question order
  shuffleOptions: true,                // Randomize option order
  showProgress: true,                  // Show progress bar
  showTimer: true,                     // Show timer
  timeLimit: 300,                      // Time limit in seconds
  allowRetry: true,                    // Allow retaking the quiz
  showResults: true,                   // Show results after completion
  showExplanations: true,              // Show explanations in results
  passPercentage: 70                   // Passing score percentage
};
```

### Theme Customization

```tsx
const theme: QuizTheme = {
  // Colors
  primaryColor: '#007bff',           // Primary button color
  secondaryColor: '#6c757d',         // Secondary button color
  backgroundColor: '#ffffff',        // Background color
  textColor: '#333333',              // Text color
  borderColor: '#dee2e6',            // Border color
  
  // Typography & Layout
  borderRadius: '8px',               // Border radius
  fontFamily: 'Arial, sans-serif',   // Font family
  fontSize: '16px'                   // Font size
};
```

## 💡 Usage Examples

### Basic Implementation
```tsx
import { Quiz, QuizQuestion } from 'react-quiz-component';

const questions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is 2 + 2?',
    type: 'single-choice',
    options: [
      { id: '1a', text: '3', value: '3' },
      { id: '1b', text: '4', value: '4' },
      { id: '1c', text: '5', value: '5' }
    ],
    correctAnswer: '4',
    points: 10
  }
];

function App() {
  return (
    <Quiz
      questions={questions}
      config={{
        title: 'Math Quiz',
        showProgress: true,
        timeLimit: 300
      }}
      onComplete={(result) => console.log('Score:', result.percentage)}
    />
  );
}
```

### Custom Theme
```tsx
<Quiz
  questions={questions}
  theme={{
    primaryColor: '#e74c3c',
    backgroundColor: '#2c3e50',
    textColor: '#ecf0f1',
    borderRadius: '12px',
    fontFamily: 'Georgia, serif'
  }}
  style={{
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    margin: '20px'
  }}
/>
```

### Answer Tracking
```tsx
const [answers, setAnswers] = useState({});

const handleAnswerChange = (questionId, answer) => {
  setAnswers(prev => ({
    ...prev,
    [questionId]: answer
  }));
};

<Quiz
  questions={questions}
  onAnswerChange={handleAnswerChange}
/>
```

### Results Integration
```tsx
const handleQuizComplete = (result) => {
  // Log results
  console.log('Score:', result.percentage);
  console.log('Correct Answers:', result.correctAnswers);
  console.log('Total Points:', result.totalPoints);
  console.log('Time Spent:', result.timeSpent);
  
  // Send to API
  fetch('/api/quiz-results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  });
};
```

## TypeScript Support

The component is fully typed with TypeScript. All interfaces are exported for your convenience:

```tsx
import { 
  QuizQuestion, 
  QuizConfig, 
  QuizTheme, 
  QuizResult 
} from 'react-quiz-component';
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

The component is optimized for performance with:
- React.memo for component memoization
- useCallback for stable function references
- useMemo for expensive calculations
- Efficient re-rendering strategies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

## Changelog

### v1.0.0
- Initial release
- Support for multiple question types
- Customizable themes
- Timer functionality
- Progress tracking
- Results display
- TypeScript support
