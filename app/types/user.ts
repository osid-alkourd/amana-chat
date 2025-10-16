export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  lastSeen: Date;
  isOnline: boolean;
}

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}
