# Enterprise PNPM Template

Production-ready full-stack template with data management, state management, and performance optimizations using PNPM for stable, widely-adopted package management.

## Features

- 📦 **PNPM** for fast, efficient, and reliable package management
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

- **Package Manager**: PNPM
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: styled-components with theming
- **State Management**: Zustand with persistence
- **Data Fetching**: Apollo Client + GraphQL
- **Testing**: React Testing Library + Cypress + Jest
- **Linting**: ESLint (Airbnb) + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 9+

### Installation

1. Create a new project:
```bash
npx create-next-app@14.2.5 my-app --typescript --eslint --app --src-dir --use-pnpm
cd my-app
pnpm add styled-components @apollo/client graphql zustand
pnpm add -D @types/styled-components @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom cypress
```

2. Or use this template directly:
```bash
git clone <repository-url>
cd enterprise-pnpm
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Type checking
pnpm type-check

# Open Cypress for E2E testing
pnpm cypress:open

# Run Cypress tests headlessly
pnpm cypress:run

# Lint code
pnpm lint

# Format code
pnpm format
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
enterprise-pnpm/
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
├── jest.config.js
├── jest.setup.js
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
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

### Unit Tests (Jest + React Testing Library)

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
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
pnpm cypress:open

# Run tests headlessly
pnpm cypress:run
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

### PNPM Optimizations
- Efficient disk space usage with content-addressable storage
- Fast installation with hard linking
- Strict dependency resolution
- Monorepo support

## Why PNPM?

### Advantages over npm/yarn:
- **Disk Efficiency**: Saves disk space by storing packages once and linking them
- **Speed**: Faster installation due to content-addressable storage
- **Strict**: Prevents access to undeclared dependencies
- **Monorepo Support**: Built-in workspace support
- **Security**: Better security model with strict dependency resolution

### Package Management Features:
- **Lockfile**: `pnpm-lock.yaml` for deterministic installs
- **Scripts**: Standard npm-compatible script execution
- **Workspaces**: Built-in monorepo support
- **Peer Dependencies**: Automatic peer dependency resolution

## Deployment

### Build Optimization

```bash
# Create production build
pnpm build

# Analyze bundle size
pnpm build && npx @next/bundle-analyzer
```

### Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
NEXT_PUBLIC_APP_ENV=production
```

### Docker Support

```dockerfile
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
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

## Migration from Other Templates

### From Enterprise-Bun

This template is functionally identical to Enterprise-Bun but uses PNPM instead of Bun:

1. Replace `bun.lockb` with `pnpm-lock.yaml`
2. Update scripts to use standard Node.js/PNPM commands
3. Add Jest configuration for testing
4. No other changes needed - all features are preserved

### From Minimal Templates

1. Add state management dependencies
2. Set up GraphQL/Apollo Client
3. Add comprehensive testing setup
4. Implement theme system
5. Add performance optimizations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`pnpm test && pnpm cypress:run`)
6. Submit a pull request

## License

MIT