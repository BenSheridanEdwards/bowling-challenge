# Enterprise Bun Template

Production-ready full-stack template with data management, state management, and performance optimizations using Bun for maximum speed and efficiency.

## Features

- ⚡ **Bun Runtime** for ultra-fast package management and execution
- 🚀 **Next.js 14** with App Router and performance optimizations
- 🔷 **TypeScript 5** for type safety
- 💅 **styled-components** with comprehensive theming system
- 🌙 **Dark/Light Theme** with persistent preferences
- 📊 **GraphQL & Apollo Client** for efficient data fetching
- 🐻 **Zustand** for lightweight global state management
- 🧪 **React Testing Library** + **Cypress** for comprehensive testing
- 📏 **ESLint** with Airbnb configuration
- 💅 **Prettier** for code formatting
- 🎯 **Performance optimizations** with memoization and lazy loading

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: styled-components with theming
- **State Management**: Zustand with persistence
- **Data Fetching**: Apollo Client + GraphQL
- **Testing**: React Testing Library + Cypress
- **Linting**: ESLint (Airbnb) + Prettier

## Getting Started

### Prerequisites

- Bun 1.0+
- Node.js 18+ (for Cypress)

### Installation

1. Create a new project:
```bash
bun create next-app@14.2.5 my-app --typescript --eslint --app --src-dir
cd my-app
bun add styled-components @apollo/client graphql zustand
bun add -D @types/styled-components @testing-library/react @testing-library/jest-dom cypress
```

2. Or use this template directly:
```bash
git clone <repository-url>
cd enterprise-bun
bun install
```

### Development

```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run unit tests
bun test

# Run unit tests in watch mode
bun test --watch

# Type checking
bun run type-check

# Open Cypress for E2E testing
bun run cypress:open

# Run Cypress tests headlessly
bun run cypress:run

# Lint code
bun run lint

# Format code
bun run format
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
enterprise-bun/
├── src/
│   ├── app/
│   │   ├── tests/
│   │   │   └── page.test.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── lib/
│   │   └── apollo-client.ts
│   ├── store/
│   │   └── appStore.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   └── GlobalStyles.tsx
│   └── types/
│       └── index.ts
├── cypress/
│   ├── e2e/
│   │   └── app.cy.ts
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── cypress.config.ts
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## Architecture

### State Management (Zustand)

```typescript
import { useAppStore } from '@/store/appStore';

function MyComponent() {
  const { user, setUser, isLoading } = useAppStore();
  // Component logic...
}
```

Features:
- Persistent state with localStorage
- DevTools integration
- TypeScript support
- Computed values
- Action-based mutations

### GraphQL & Apollo Client

```typescript
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/queries/users';

function UserList() {
  const { data, loading, error } = useQuery(GET_USERS);
  // Component logic...
}
```

Features:
- Optimistic updates
- Cache management
- Error handling
- Authentication integration

### Theme System

```typescript
import { useTheme } from '@/hooks/useTheme';

function ThemedComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  // Component logic...
}
```

Features:
- Light/Dark theme switching
- Persistent theme preferences
- Comprehensive design tokens
- Responsive breakpoints
- Accessibility support

### Component Library

#### Button Component

```typescript
import { Button } from '@/components/Button';

<Button 
  variant="primary" // primary | secondary | outline | ghost
  size="lg" // sm | md | lg
  loading={isLoading}
  onClick={handleClick}
>
  Click Me!
</Button>
```

Features:
- Multiple variants and sizes
- Loading states
- Accessibility support
- Performance optimizations with memo

## Testing

### Unit Tests (React Testing Library)

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch
```

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <MyComponent />
    </ThemeProvider>
  );
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### E2E Tests (Cypress)

```bash
# Open Cypress GUI
bun run cypress:open

# Run tests headlessly
bun run cypress:run
```

Features:
- Full application testing
- Theme switching tests
- Responsive design tests
- Accessibility tests
- Custom commands

## Performance Optimizations

### React Optimizations
- Component memoization with `React.memo`
- Callback memoization with `useCallback`
- Bundle optimization with `optimizePackageImports`

### Next.js Optimizations
- App Router for better performance
- Image optimization
- Font optimization
- TypeScript strict mode

### Bun Optimizations
- Fast package installation
- Native bundling
- Optimized runtime performance

## Deployment

### Build Optimization

```bash
# Create production build
bun run build

# Analyze bundle size
bun run build && npx @next/bundle-analyzer
```

### Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
NEXT_PUBLIC_APP_ENV=production
```

## Customization

### Extending the Theme

```typescript
// src/styles/theme.ts
export const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    brand: '#ff6b6b',
    brandHover: '#ff5252',
  },
};
```

### Adding New Store Slices

```typescript
// src/store/userStore.ts
interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ 
    users: [...state.users, user] 
  })),
  removeUser: (id) => set((state) => ({ 
    users: state.users.filter((u) => u.id !== id) 
  })),
}));
```

### GraphQL Queries

```typescript
// src/queries/users.ts
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      avatar
    }
  }
`;
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT