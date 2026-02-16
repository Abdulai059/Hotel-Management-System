import "three-dots/dist/three-dots.min.css";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white px-10 py-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="dot-spin"></div>
        </div>
        <p className="text-center text-base text-gray-700">Loading Content...</p>
      </div>
    </div>
  );
}
