'use client';

import { Inter } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { apolloClient } from '@/lib/apollo-client';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

function AppContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className={inter.className}>
        {children}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Enterprise Bun Template</title>
        <meta
          name="description"
          content="Production-ready full-stack template with performance optimizations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ApolloProvider client={apolloClient}>
          <AppContent>{children}</AppContent>
        </ApolloProvider>
      </body>
    </html>
  );
}