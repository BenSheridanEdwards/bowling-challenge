import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import Home from '../page';
import { lightTheme } from '@/styles/theme';
import { apolloClient } from '@/lib/apollo-client';
import { useAppStore } from '@/store/appStore';

// Mock the store
jest.mock('@/store/appStore');
const mockUseAppStore = useAppStore as jest.MockedFunction<typeof useAppStore>;

// Mock alert
const mockAlert = jest.fn();
global.alert = mockAlert;

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
    </ApolloProvider>
  );
};

describe('Home Page', () => {
  const mockAddButtonClick = jest.fn();
  const mockGetButtonClickCount = jest.fn();
  const mockGetTotalClickCount = jest.fn();
  const mockClearButtonClicks = jest.fn();

  beforeEach(() => {
    mockAlert.mockClear();
    mockAddButtonClick.mockClear();
    mockGetButtonClickCount.mockClear();
    mockGetTotalClickCount.mockClear();
    mockClearButtonClicks.mockClear();

    mockUseAppStore.mockReturnValue({
      addButtonClick: mockAddButtonClick,
      getButtonClickCount: mockGetButtonClickCount,
      getTotalClickCount: mockGetTotalClickCount,
      clearButtonClicks: mockClearButtonClicks,
      user: null,
      isLoading: false,
      theme: 'light',
      buttonClicks: [],
      setUser: jest.fn(),
      setLoading: jest.fn(),
      toggleTheme: jest.fn(),
    });

    mockGetButtonClickCount.mockReturnValue(0);
    mockGetTotalClickCount.mockReturnValue(0);
  });

  it('renders the title and subtitle', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('Enterprise Bun Template')).toBeInTheDocument();
    expect(
      screen.getByText(/Production-ready full-stack template/)
    ).toBeInTheDocument();
  });

  it('renders both buttons', () => {
    renderWithProviders(<Home />);
    
    const primaryButton = screen.getByTestId('primary-button');
    const secondaryButton = screen.getByTestId('secondary-button');
    
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveTextContent('Click Me!');
    expect(secondaryButton).toHaveTextContent('Secondary Action');
  });

  it('handles primary button click', async () => {
    renderWithProviders(<Home />);
    
    const primaryButton = screen.getByTestId('primary-button');
    fireEvent.click(primaryButton);
    
    expect(mockAddButtonClick).toHaveBeenCalledWith('primary-button');
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Hello from Enterprise Bun template!');
    });
  });

  it('handles secondary button click', () => {
    renderWithProviders(<Home />);
    
    const secondaryButton = screen.getByTestId('secondary-button');
    fireEvent.click(secondaryButton);
    
    expect(mockAddButtonClick).toHaveBeenCalledWith('secondary-button');
    expect(mockAlert).toHaveBeenCalledWith('Secondary action executed!');
  });

  it('displays click statistics', () => {
    mockGetButtonClickCount.mockImplementation((buttonId) => {
      if (buttonId === 'primary-button') return 5;
      if (buttonId === 'secondary-button') return 3;
      return 0;
    });
    mockGetTotalClickCount.mockReturnValue(8);

    renderWithProviders(<Home />);
    
    expect(screen.getByText('Primary Button: 5 clicks')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button: 3 clicks')).toBeInTheDocument();
    expect(screen.getByText('Total Clicks: 8')).toBeInTheDocument();
  });

  it('shows clear stats button when there are clicks', () => {
    mockGetTotalClickCount.mockReturnValue(5);

    renderWithProviders(<Home />);
    
    const clearButton = screen.getByText('Clear Stats');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(mockClearButtonClicks).toHaveBeenCalled();
  });

  it('hides clear stats button when there are no clicks', () => {
    mockGetTotalClickCount.mockReturnValue(0);

    renderWithProviders(<Home />);
    
    expect(screen.queryByText('Clear Stats')).not.toBeInTheDocument();
  });
});