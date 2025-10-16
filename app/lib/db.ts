import fs from 'fs';
import path from 'path';
import { User } from '@/app/types/user';

const DB_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize database file if it doesn't exist
const initializeDatabase = () => {
  ensureDataDirectory();
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
  }
};

// Read all users from JSON file
export const getAllUsers = (): User[] => {
  try {
    initializeDatabase();
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    
    // Convert date strings back to Date objects
    return parsed.users.map((user: any) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      lastSeen: new Date(user.lastSeen)
    }));
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Write users to JSON file
const saveUsers = (users: User[]): void => {
  try {
    ensureDataDirectory();
    const data = {
      users: users.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        lastSeen: user.lastSeen.toISOString()
      }))
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Failed to save users');
  }
};

// Find user by username
export const findUserByUsername = (username: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

// Find user by ID
export const findUserById = (id: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.id === id) || null;
};

// Check if user exists by username or email
export const userExists = (username: string, email: string): boolean => {
  const users = getAllUsers();
  return users.some(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    u.email.toLowerCase() === email.toLowerCase()
  );
};

// Add new user
export const addUser = (user: User): User => {
  const users = getAllUsers();
  users.push(user);
  saveUsers(users);
  return user;
};

// Update user
export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) {
    return null;
  }
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
};

// Delete user
export const deleteUser = (userId: string): boolean => {
  const users = getAllUsers();
  const filteredUsers = users.filter(u => u.id !== userId);
  
  if (filteredUsers.length === users.length) {
    return false; // User not found
  }
  
  saveUsers(filteredUsers);
  return true;
};

// Generate unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
