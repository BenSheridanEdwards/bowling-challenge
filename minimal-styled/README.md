# Minimal Styled Template

Core essentials for small applications with styled-components for modular, reusable styles and basic theming.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript 5** for type safety
- 💅 **styled-components** for CSS-in-JS with theming
- 🧪 **React Testing Library** for component testing
- 📏 **ESLint** with Airbnb configuration
- 💅 **Prettier** for code formatting
- 📦 **PNPM** for fast package management

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 9+

### Installation

1. Clone this template:
```bash
npx create-next-app@14.2.5 my-app --typescript --eslint --app --src-dir --use-pnpm
cd my-app
pnpm add styled-components
pnpm add -D @types/styled-components @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

2. Or use this template directly:
```bash
git clone <repository-url>
cd minimal-styled
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

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Format code
pnpm format
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
minimal-styled/
├── src/
│   ├── app/
│   │   ├── tests/
│   │   │   └── page.test.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Button.tsx
│   └── styles/
│       ├── theme.ts
│       └── GlobalStyles.tsx
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── jest.config.js
├── jest.setup.js
├── next.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## Theme System

This template includes a comprehensive theme system with styled-components:

### Using the Theme

```typescript
import styled from 'styled-components';

const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
```

### Theme Structure

- **Colors**: Primary, secondary, background, text colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Typography**: Font sizes and weights
- **Border Radius**: Consistent border radius values
- **Shadows**: Box shadow utilities
- **Transitions**: Animation timing functions

## Component Library

### Button Component

```typescript
import { Button } from '@/components/Button';

<Button 
  variant="primary" // or "secondary"
  size="lg" // or "sm", "md"
  onClick={handleClick}
>
  Click Me!
</Button>
```

## Testing

This template includes React Testing Library for component testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

Example test structure:
```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};
```

## Customization

### Extending the Theme

Edit `src/styles/theme.ts` to customize your design system:

```typescript
export const theme = {
  colors: {
    primary: '#0070f3',
    primaryHover: '#0051cc',
    // Add more colors...
  },
  // Add more theme properties...
};
```

### Creating New Components

Follow the pattern established in `src/components/Button.tsx`:

1. Use styled-components for styling
2. Accept theme props for consistency
3. Include TypeScript interfaces
4. Add unit tests

## License

MIT