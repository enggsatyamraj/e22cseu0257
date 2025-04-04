'use client';

// src/app/page.js
import { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import {
  Card,
  CardHeader,
  CardContent,
  LoadingSpinner,
  ErrorMessage,
  UserAvatar,
  Button,
  Badge
} from '@/components/ui';
import Unauthorized from '@/components/Unauthorized';

export default function HomePage() {
  const {
    isAuthenticated,
    isLoading,
    error,
    topUsers,
    refreshData
  } = useSocial();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setTimeout(() => setIsRefreshing(false), 1000); // UI feedback
  };

  // Get a trophy emoji based on rank
  const getTrophy = (index) => {
    const trophies = ['🏆', '🥈', '🥉', '4️⃣', '5️⃣'];
    return trophies[index];
  };

  // If not authenticated, show the unauthorized component
  if (!isAuthenticated && !isLoading) {
    return <Unauthorized onRegister={refreshData} />;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Top Users</h1>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          variant={isRefreshing ? "secondary" : "primary"}
          size="sm"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <Card>
          <CardHeader title="Top 5 Users by Post Count" />
          <CardContent>
            <div className="divide-y divide-gray-200">
              {topUsers.length > 0 ? (
                topUsers.map((user, index) => (
                  <div key={user.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="text-lg font-medium text-gray-500">{getTrophy(index)}</span>
                      </div>
                      <UserAvatar name={user.name} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">User ID: {user.id}</p>
                      </div>
                    </div>
                    <div className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      {user.postCount} posts
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  <p className="text-lg">No user data available</p>
                  <p className="mt-2 text-sm">Try refreshing the data or check your connection.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}