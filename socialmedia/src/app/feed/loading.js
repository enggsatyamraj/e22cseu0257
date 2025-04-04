// src/app/feed/loading.js

export default function FeedLoading() {
    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start space-x-3">
                                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="flex-1">
                                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-48 bg-gray-100 animate-pulse"></div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex justify-between">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}