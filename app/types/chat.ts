export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  username: string;
  avatar?: string;
  timestamp: Date;
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  memberCount: number;
}

export interface TypingUser {
  userId: string;
  username: string;
}

export interface PresenceMember {
  clientId: string;
  data: {
    username: string;
    avatar?: string;
  };
}
