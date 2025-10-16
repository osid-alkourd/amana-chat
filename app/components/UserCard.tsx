'use client';

import { User } from '@/app/types/user';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          {/* Online Status Indicator */}
          <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 ${
            user.isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {user.username}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.isOnline 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {user.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
            {user.email}
          </p>

          <div className="mt-3 space-y-1 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Member since: {user.createdAt.toLocaleDateString()}</span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Last seen: {user.isOnline ? 'Now' : user.lastSeen.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
