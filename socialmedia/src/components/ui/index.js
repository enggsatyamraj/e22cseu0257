'use client';

// src/components/ui/index.js

// Loading Spinner Component
export function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
}

// Error Display Component
export function ErrorMessage({ message }) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{message}</span>
        </div>
    );
}

// Card Component
export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white shadow overflow-hidden rounded-lg ${className}`}>
            {children}
        </div>
    );
}

// Card Header
export function CardHeader({ title, action }) {
    return (
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            {action && <div>{action}</div>}
        </div>
    );
}

// Card Content
export function CardContent({ children, className = '' }) {
    return (
        <div className={`px-4 py-5 sm:p-6 ${className}`}>
            {children}
        </div>
    );
}

// User Avatar Component
export function UserAvatar({ name, size = 'md' }) {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
    };

    // Generate a color based on the user name
    const getColor = (name) => {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'
        ];

        const hash = name.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);

        return colors[hash % colors.length];
    };

    // Get initials from name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className={`${getColor(name)} ${sizes[size]} flex items-center justify-center rounded-full text-white font-medium`}>
            {getInitials(name)}
        </div>
    );
}

// Post Card Component
export function PostCard({ post, user, comments = [] }) {
    return (
        <Card className="mb-4">
            <CardContent>
                <div className="flex items-start space-x-3">
                    <UserAvatar name={user?.name || 'User'} />
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{user?.name || 'Unknown User'}</h4>
                        </div>
                        <p className="text-gray-700">{post.content}</p>

                        <div className="mt-2 text-sm text-gray-500 flex items-center space-x-2">
                            <span>{comments.length} comments</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Button Component
export function Button({ children, onClick, variant = 'primary', size = 'md', className = '' }) {
    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        outline: 'bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600',
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            onClick={onClick}
            className={`${variants[variant]} ${sizes[size]} rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
        >
            {children}
        </button>
    );
}

// Badge Component
export function Badge({ children, variant = 'default' }) {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
    };

    return (
        <span className={`${variants[variant]} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
            {children}
        </span>
    );
}