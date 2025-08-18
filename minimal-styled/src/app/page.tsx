'use client';

import styled from 'styled-components';
import { Button } from '@/components/Button';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export default function Home() {
  const handleClick = () => {
    alert('Hello from styled-components!');
  };

  return (
    <Container>
      <Content>
        <Title>Minimal Styled Template</Title>
        <Button onClick={handleClick} size="lg">
          Click Me!
        </Button>
      </Content>
    </Container>
  );
}