### Proportion Problem Generator

## Technical Overview

This is a dynamic proportion problem generator built with modern web technologies. The application generates random mathematical proportion problems with step-by-step solutions, providing an interactive learning tool for students and educators.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React** - UI library with functional components and hooks
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components built on Radix UI
- **Lucide React** - SVG icon library


## Technical Features

- **Client-side Problem Generation** - All problems are generated in the browser using JavaScript's Math.random()
- **Dynamic State Management** - React useState for managing problem state and UI interactions
- **Type Safety** - Full TypeScript implementation with interfaces for problem structures
- **Responsive Design** - Mobile-first approach using Tailwind's responsive classes
- **Accessible UI** - Built with accessibility in mind using shadcn/ui components
- **Modular Architecture** - Separation of problem generation logic from UI components


## Project Structure

```plaintext
proportion-problems/
├── app/
│   └── page.tsx       # Main application component
├── components/
│   └── ui/            # shadcn/ui components
├── lib/
│   └── utils.ts       # Utility functions
├── public/            # Static assets
└── tailwind.config.ts # Tailwind configuration
```

## Problem Generation Logic

The application uses several algorithms to generate different types of proportion problems:

1. **Random Variable Selection** - Dynamically selects values within appropriate ranges
2. **Problem Templates** - Four different problem types with unique structures
3. **Solution Calculation** - Automatically calculates step-by-step solutions using the fictional values method
4. **Fraction Calculation** - Derives proportional relationships and final answers


## Implementation Details

- **Problem Type System** - TypeScript interfaces define the structure of problems and solutions
- **Random Data Generation** - Custom functions for generating realistic problem scenarios
- **UI State Management** - React hooks control the problem display and solution visibility
- **Tabs Component** - Provides separate views for solution and practice modes
- **Responsive Cards** - Adapts to different screen sizes while maintaining readability


## Installation and Setup

```shellscript
# Clone the repository
git clone https://github.com/yourusername/proportion-problems.git

# Navigate to the project directory
cd proportion-problems

# Install dependencies
npm install

# Run the development server
npm run dev
```

## How It Works (Technical Perspective)

1. The `generateProblem()` function randomly selects a problem type
2. Based on the type, a specific generator function creates a problem object with:

1. Random variables within defined constraints
2. Calculated relationships between variables
3. Pre-computed solution steps using the fictional values method



3. The problem object is stored in React state
4. The UI renders the problem description and solution based on the current state
5. All calculations happen client-side without requiring server interaction


## Future Technical Improvements

- Add database integration to save generated problems
- Implement user authentication to track progress
- Create an API endpoint to generate problems server-side
- Add difficulty levels with more complex proportion scenarios
- Implement testing with Jest and React Testing Library
