import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          Loading Cryptocurrency Data...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Fetching the latest market information
        </p>
      </div>
    </div>
  );
}
