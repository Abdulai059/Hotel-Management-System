import { AlertTriangle, RefreshCw, Home } from "lucide-react";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-50 p-4">
              <AlertTriangle className="h-14 w-14 text-red-500" />
            </div>
          </div>

          <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>

          <div className="mb-8 rounded-lg bg-red-50 p-4">
            <p className="text-center font-mono text-sm text-red-600">{error.message}</p>
          </div>

          <p className="mb-8 text-center text-gray-600">
            We're sorry for the inconvenience. Please try again or return to the homepage.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={resetErrorBoundary}
              className="flex items-center justify-center gap-2 bg-[#3c76a3]/90 px-6 py-2 font-semibold text-white transition-all hover:bg-[#3c76a3] focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center justify-center gap-2 border-2 border-gray-300 bg-white px-6 py-2 font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <Home className="h-5 w-5" />
              Go Home
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">If this problem persists, please contact support.</p>
      </div>
    </div>
  );
}

export default ErrorFallback;
