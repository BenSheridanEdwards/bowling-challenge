'use client';

import { memo } from 'react';
import styled from 'styled-components';
import { Theme } from '@/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  'data-testid'?: string;
}

const StyledButton = styled.button<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
  $fullWidth: boolean;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-align: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    `
    cursor: wait;
    
    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      margin: auto;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }
    
    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }
      to {
        transform: rotate(1turn);
      }
    }
  `}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.background};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryHover};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.backgroundSecondary};
            transform: translateY(-1px);
          }
        `;
      case 'primary':
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.background};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
  }}

  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
          min-height: 2rem;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xxl};
          font-size: ${theme.fontSizes.lg};
          min-height: 3rem;
        `;
      case 'md':
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.md};
          min-height: 2.5rem;
        `;
    }
  }}
`;

const ButtonContent = styled.span<{ $loading: boolean }>`
  ${({ $loading }) => $loading && 'opacity: 0;'}
`;

export const Button = memo(function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  'data-testid': testId,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      data-testid={testId}
    >
      <ButtonContent $loading={loading}>{children}</ButtonContent>
    </StyledButton>
  );
});