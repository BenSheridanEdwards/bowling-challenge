'use client';

import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/Button';
import { useAppStore } from '@/store/appStore';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.xxxxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const Subtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Stats = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StatItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

function Home() {
  const { addButtonClick, getButtonClickCount, getTotalClickCount, clearButtonClicks } = useAppStore();

  const handlePrimaryClick = useCallback(() => {
    addButtonClick('primary-button');
    // Simulate API call or complex operation
    setTimeout(() => {
      alert('Hello from Enterprise Bun template!');
    }, 100);
  }, [addButtonClick]);

  const handleSecondaryClick = useCallback(() => {
    addButtonClick('secondary-button');
    alert('Secondary action executed!');
  }, [addButtonClick]);

  const handleClearStats = useCallback(() => {
    clearButtonClicks();
  }, [clearButtonClicks]);

  const primaryClickCount = getButtonClickCount('primary-button');
  const secondaryClickCount = getButtonClickCount('secondary-button');
  const totalClickCount = getTotalClickCount();

  return (
    <Container>
      <Content>
        <Title>Enterprise Bun Template</Title>
        <Subtitle>
          Production-ready full-stack template with GraphQL, Zustand state management,
          and performance optimizations powered by Bun.
        </Subtitle>
        
        <ButtonGroup>
          <Button
            onClick={handlePrimaryClick}
            size="lg"
            data-testid="primary-button"
          >
            Click Me!
          </Button>
          
          <Button
            onClick={handleSecondaryClick}
            variant="outline"
            size="lg"
            data-testid="secondary-button"
          >
            Secondary Action
          </Button>
        </ButtonGroup>

        <Stats>
          <StatItem>
            <strong>Primary Button:</strong> {primaryClickCount} clicks
          </StatItem>
          <StatItem>
            <strong>Secondary Button:</strong> {secondaryClickCount} clicks
          </StatItem>
          <StatItem>
            <strong>Total Clicks:</strong> {totalClickCount}
          </StatItem>
          {totalClickCount > 0 && (
            <Button
              onClick={handleClearStats}
              variant="ghost"
              size="sm"
              style={{ marginTop: '1rem' }}
            >
              Clear Stats
            </Button>
          )}
        </Stats>
      </Content>
    </Container>
  );
}

export default memo(Home);