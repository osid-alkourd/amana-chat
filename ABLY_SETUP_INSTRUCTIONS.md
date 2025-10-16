# Ably Chat Integration - Setup Instructions

## 📋 Overview
This guide will help you integrate Ably for real-time chat functionality in your Amana Chat application.

## 🔧 Step 1: Install Ably Package

Run the following command in your terminal:

```bash
npm install ably
```

## 🔑 Step 2: Get Your Ably API Key

1. Go to [https://ably.com](https://ably.com)
2. Sign up for a free account (or login)
3. Create a new app in your dashboard
4. Go to the "API Keys" tab
5. Copy your API key (it looks like: `xVLyHw.xxxxxx:xxxxxxxxx`)

## 🛠️ Step 3: Configure Environment Variables

Create a file named `.env.local` in your project root:

```env
NEXT_PUBLIC_ABLY_API_KEY=your_ably_api_key_here
```

Replace `your_ably_api_key_here` with your actual Ably API key.

**Important:** Never commit `.env.local` to git! It's already in your `.gitignore`.

## 📁 Step 4: Create Required Files

I'll create these files for you:

### Files to be created:
1. `app/contexts/AblyContext.tsx` - Ably client management
2. `app/hooks/useAblyChat.ts` - Chat functionality hook
3. `app/hooks/usePresence.ts` - User presence hook
4. `app/hooks/useTyping.ts` - Typing indicators hook
5. `app/components/ChatMessage.tsx` - Message component
6. `app/components/ChatInput.tsx` - Message input component
7. `app/components/ChatRoom.tsx` - Main chat room component
8. `app/chat/page.tsx` - Chat page

## 🚀 Step 5: Features Included

### ✅ Real-Time Messaging
- Send and receive messages instantly
- Message history
- Auto-scroll to new messages

### ✅ User Presence
- See who's online in the chat room
- Real-time join/leave notifications
- User avatars and names

### ✅ Typing Indicators
- See when other users are typing
- "User is typing..." notification
- Auto-clear after inactivity

### ✅ Multiple Rooms Support
- Create different chat rooms
- Switch between rooms
- Separate message history per room

## 📖 Step 6: How It Works

### Architecture:
```
User Interface (React)
        ↓
   Ably Context
        ↓
   Ably Channels
        ↓
   Ably Service (Cloud)
        ↓
   Other Users
```

### Channels Used:
- `chat:general` - Main chat messages
- `chat:general:presence` - User presence (online/offline)
- `chat:general:typing` - Typing indicators

## 🎯 Next Steps

After completing the setup:

1. Install the Ably package
2. Add your API key to `.env.local`
3. Restart your dev server: `npm run dev`
4. Navigate to `/chat` to see your chat in action
5. Open multiple browser tabs to test real-time sync

## 🔒 Security Notes

- Never expose your Ably API key in client code directly
- Use environment variables (`NEXT_PUBLIC_` prefix for client-side)
- For production, implement token authentication
- Consider implementing channel permissions

## 📚 Additional Resources

- [Ably Documentation](https://ably.com/docs)
- [Ably React Guide](https://ably.com/docs/getting-started/react)
- [Ably Channels](https://ably.com/docs/channels)
- [Ably Presence](https://ably.com/docs/presence-occupancy/presence)

## 🆘 Troubleshooting

### Connection Issues:
- Check your API key is correct
- Verify environment variable is set
- Restart dev server after adding `.env.local`

### Messages Not Syncing:
- Check browser console for errors
- Verify all users are on the same channel
- Check Ably dashboard for connection status

### Presence Not Working:
- Ensure clientId is unique per user
- Check presence channel subscription
- Verify user data is being passed correctly

## ✨ Ready to Chat!

Once everything is set up, users can:
- Send real-time messages
- See who's online
- Know when someone is typing
- Chat across multiple devices simultaneously

Your Amana Chat app will be fully functional with real-time capabilities!

