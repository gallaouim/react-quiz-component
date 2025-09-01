# Release v1.0.0 - Initial Release

## 🎉 First Public Release

This is the initial release of the React Quiz Component - a highly customizable and flexible quiz component for React applications.

## ✨ Features

### 🎯 Question Types
- **Single Choice**: Traditional multiple choice with one correct answer
- **Multiple Choice**: Select multiple correct answers
- **Boolean**: True/False questions
- **Text**: Open-ended text input questions

### 🎨 Customization
- **5 Pre-built Themes**: Default, Dark, Light, Blue, Green
- **Custom Theming**: Full control over colors, fonts, and styling
- **Responsive Design**: Works perfectly on all screen sizes

### ⏱️ Timer & Progress
- **Countdown Timer**: Visual timer with warnings
- **Progress Tracking**: Question navigation and progress indicators
- **Time Limits**: Configurable time limits per quiz

### 📊 Results & Scoring
- **Points System**: Configurable points per question
- **Percentage Scoring**: Automatic score calculation
- **Detailed Results**: Show correct answers and explanations
- **Retry Functionality**: Option to retake quizzes

### 🚀 Performance & Developer Experience
- **TypeScript Support**: Full type safety and IntelliSense
- **React Hooks**: Built with modern React patterns
- **Optimized**: Memoized components for better performance
- **Tree Shaking**: Only import what you use

## 📦 Installation

```bash
npm install @gallaouim/react-quiz-component
# or
yarn add @gallaouim/react-quiz-component
# or
pnpm add @gallaouim/react-quiz-component
```

## 🚀 Quick Start

```tsx
import { Quiz, QuizQuestion } from '@gallaouim/react-quiz-component';

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

## 🔧 Configuration Options

- **Question Shuffling**: Randomize question and option order
- **Timer Settings**: Enable/disable timer with custom limits
- **Progress Display**: Show/hide progress indicators
- **Results Display**: Customize results page appearance
- **Retry Options**: Allow users to retake quizzes
- **Passing Score**: Set custom passing percentages

## 🎨 Theme Customization

```tsx
const theme = {
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderRadius: '8px',
  fontFamily: 'Arial, sans-serif'
};
```

## 📚 Documentation

- **API Reference**: Complete prop documentation
- **Usage Examples**: Multiple implementation examples
- **TypeScript Types**: Full type definitions
- **Contributing Guide**: How to contribute to the project

## 🧪 Testing

- **Unit Tests**: Comprehensive test suite with Jest
- **React Testing Library**: Component testing
- **TypeScript**: Full type checking

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🔗 Links

- **npm Package**: https://www.npmjs.com/package/@gallaouim/react-quiz-component
- **GitHub Repository**: https://github.com/gallaouim/react-quiz-component
- **Issues**: https://github.com/gallaouim/react-quiz-component/issues

---

**Thank you for using React Quiz Component! 🎉**

If you find this component useful, please consider giving it a star on GitHub!
