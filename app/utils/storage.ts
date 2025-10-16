import { User } from '@/app/types/user';

const USER_STORAGE_KEY = 'amana_chat_user';
const USERS_STORAGE_KEY = 'amana_chat_users';

// Generate a simple ID (in a real app, this would come from your backend)
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// User storage functions
export const saveUserToStorage = (user: User): void => {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
      ...user,
      createdAt: user.createdAt.toISOString(),
      lastSeen: user.lastSeen.toISOString()
    }));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const getUserFromStorage = (): User | null => {
  try {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    if (!userData) return null;

    const parsed = JSON.parse(userData);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      lastSeen: new Date(parsed.lastSeen)
    };
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

export const removeUserFromStorage = (): void => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

// Multiple users storage (for demo purposes)
export const saveUsersToStorage = (users: User[]): void => {
  try {
    const usersData = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      lastSeen: user.lastSeen.toISOString()
    }));
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

export const getUsersFromStorage = (): User[] => {
  try {
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersData) return [];

    const parsed = JSON.parse(usersData);
    return parsed.map((user: any) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      lastSeen: new Date(user.lastSeen)
    }));
  } catch (error) {
    console.error('Error getting users from localStorage:', error);
    return [];
  }
};

// Check if user exists by username or email
export const checkUserExists = (username: string, email: string): boolean => {
  const users = getUsersFromStorage();
  return users.some(user => 
    user.username.toLowerCase() === username.toLowerCase() || 
    user.email.toLowerCase() === email.toLowerCase()
  );
};

// Add new user to users list
export const addUserToStorage = (user: User): void => {
  const users = getUsersFromStorage();
  users.push(user);
  saveUsersToStorage(users);
};
