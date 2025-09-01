# Contributing to React Multi Quiz

Thank you for your interest in contributing to React Multi Quiz! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/react-quiz-component.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `npm test`
7. **Build** the project: `npm run build`
8. **Commit** your changes: `git commit -m 'Add amazing feature'`
9. **Push** to your branch: `git push origin feature/amazing-feature`
10. **Open** a Pull Request

## 📋 Development Setup

### Prerequisites
- Node.js >= 16
- npm >= 8

### Installation
```bash
git clone https://github.com/yourusername/react-quiz-component.git
cd react-quiz-component
npm install
```

### Available Scripts
- `npm run build` - Build the component for production
- `npm run dev` - Build in watch mode for development
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run clean` - Clean build artifacts

## 🧪 Testing

We use Jest and React Testing Library for testing. All new features should include tests.

### Running Tests
```bash
npm test
npm run test:watch  # Watch mode
```

### Test Structure
- Tests should be placed in `src/**/__tests__/` directories
- Test files should be named `*.test.ts` or `*.test.tsx`
- Use descriptive test names and group related tests

### Example Test
```tsx
import { render, screen } from '@testing-library/react';
import { Quiz } from '../Quiz';

describe('Quiz Component', () => {
  it('should render quiz title', () => {
    const questions = [/* test questions */];
    render(<Quiz questions={questions} />);
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });
});
```

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Provide proper type definitions
- Use interfaces for object shapes
- Avoid `any` type - use proper typing

### React
- Use functional components with hooks
- Use proper prop types and interfaces
- Follow React best practices
- Use meaningful component and prop names

### Code Formatting
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use trailing commas in objects and arrays

### JSDoc Comments
Add JSDoc comments for all public functions and components:

```tsx
/**
 * Calculates the quiz score based on answers.
 * 
 * @param questions - Array of quiz questions
 * @param answers - User answers object
 * @returns Quiz result with score and statistics
 * 
 * @example
 * ```ts
 * const result = calculateScore(questions, userAnswers);
 * console.log(`Score: ${result.percentage}%`);
 * ```
 */
export const calculateScore = (questions: QuizQuestion[], answers: Record<string, string>) => {
  // Implementation
};
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── Quiz.tsx        # Main quiz component
│   ├── QuizQuestion.tsx # Individual question component
│   ├── QuizProgress.tsx # Progress indicator
│   ├── QuizTimer.tsx   # Timer component
│   └── QuizResults.tsx # Results display
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── quizUtils.ts    # Quiz logic utilities
│   └── __tests__/      # Test files
└── index.ts            # Main export file
```

### Component Design Principles
1. **Single Responsibility** - Each component has one clear purpose
2. **Composition** - Build complex components from simple ones
3. **Props Interface** - Define clear prop interfaces
4. **Default Props** - Provide sensible defaults
5. **Error Handling** - Handle edge cases gracefully

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Step-by-step instructions
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - Browser, OS, React version
6. **Code Example** - Minimal code to reproduce

## 💡 Feature Requests

When requesting features, please include:

1. **Description** - Clear description of the feature
2. **Use Case** - Why this feature is needed
3. **Proposed API** - How you'd like to use it
4. **Examples** - Code examples if applicable

## 🔄 Pull Request Process

1. **Update** the README.md if needed
2. **Add** tests for new functionality
3. **Ensure** all tests pass
4. **Update** documentation
5. **Follow** the commit message format
6. **Request** review from maintainers

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build/tooling changes

Examples:
```
feat(quiz): add timer functionality
fix(progress): resolve progress bar display issue
docs(readme): update installation instructions
```

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for all public APIs
- Include examples in documentation
- Keep documentation up to date

### README Updates
- Update README.md for new features
- Add usage examples
- Update API documentation

## 🚀 Release Process

1. **Update** version in package.json
2. **Update** CHANGELOG.md
3. **Create** release tag
4. **Publish** to npm

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct

## 📞 Getting Help

- **Issues** - Use GitHub issues for bugs and feature requests
- **Discussions** - Use GitHub discussions for questions
- **Documentation** - Check the README and code comments

## 🎯 Development Priorities

1. **Bug Fixes** - Critical issues first
2. **Performance** - Optimize existing features
3. **Accessibility** - Improve accessibility
4. **New Features** - Add requested functionality
5. **Documentation** - Improve documentation

Thank you for contributing to React Quiz Component! 🎉
