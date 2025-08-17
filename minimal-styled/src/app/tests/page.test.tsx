import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Home from '../page';
import { theme } from '@/styles/theme';

// Mock alert
const mockAlert = jest.fn();
global.alert = mockAlert;

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Home Page', () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  it('renders the title', () => {
    renderWithTheme(<Home />);
    
    const title = screen.getByText('Minimal Styled Template');
    expect(title).toBeInTheDocument();
  });

  it('renders the button', () => {
    renderWithTheme(<Home />);
    
    const button = screen.getByRole('button', { name: /click me!/i });
    expect(button).toBeInTheDocument();
  });

  it('shows alert when button is clicked', () => {
    renderWithTheme(<Home />);
    
    const button = screen.getByRole('button', { name: /click me!/i });
    fireEvent.click(button);
    
    expect(mockAlert).toHaveBeenCalledWith('Hello from styled-components!');
  });

  it('has correct styling classes', () => {
    renderWithTheme(<Home />);
    
    const button = screen.getByRole('button', { name: /click me!/i });
    expect(button).toHaveStyle({
      'background-color': theme.colors.primary,
      color: theme.colors.white,
    });
  });
});