// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { SocialProvider } from '@/context/SocialContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social Media Analytics',
  description: 'A social media analytics application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocialProvider>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-indigo-600 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h1 className="text-xl font-bold">Social Media Analytics</h1>
                    </div>
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a href="/"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Top Users
                      </a>
                      <a href="/trending"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Trending Posts
                      </a>
                      <a href="/feed"
                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Feed
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <a href="/login"
                      className="px-3 py-2 text-sm font-medium hover:bg-indigo-700 border border-white rounded-md">
                      Login
                    </a>
                    <a href="/register"
                      className="ml-2 px-3 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md hover:bg-gray-100">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>

            <footer className="bg-white border-t border-gray-200 py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-500 text-sm">
                  Social Media Analytics Dashboard © {new Date().getFullYear()}
                </p>
              </div>
            </footer>
          </div>
        </SocialProvider>
      </body>
    </html>
  );
}