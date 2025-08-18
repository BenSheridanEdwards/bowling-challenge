# Minimal Tailwind Template

A lightweight React/Next.js template optimized for rapid prototyping with Tailwind CSS utility classes.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript 5** for type safety
- 🎨 **Tailwind CSS** for utility-first styling
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
npx create-next-app@14.2.5 my-app --typescript --tailwind --eslint --app --src-dir --use-pnpm
cd my-app
```

2. Or use this template directly:
```bash
git clone <repository-url>
cd minimal-tailwind
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

# Lint code
pnpm lint

# Format code
pnpm format
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
minimal-tailwind/
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize your color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#0070f3',
      'primary-hover': '#0051cc',
    },
  },
},
```

### Styling

This template uses Tailwind CSS utility classes for styling. No additional CSS frameworks are included to keep it lightweight for rapid prototyping.

## License

MIT