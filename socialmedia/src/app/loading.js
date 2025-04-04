// src/app/loading.js

export default function HomeLoading() {
    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <div className="h-8 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
                    <div className="h-5 w-56 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <div className="divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="py-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div>
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}