// src/app/trending/loading.js

export default function TrendingLoading() {
    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                    <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-2"></div>

                                        <div className="mt-2 flex items-center space-x-2">
                                            <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse"></div>
                                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}