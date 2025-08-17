export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ButtonClickEvent {
  timestamp: number;
  userId?: string;
  buttonId: string;
}

export interface AppState {
  user: User | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
  buttonClicks: ButtonClickEvent[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}