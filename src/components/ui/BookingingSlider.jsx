import { ArrowRightLeft } from "lucide-react";

export default function BookingingSlider() {
  return (
    <button
      style={{ animation: "float 3s ease-in-out infinite" }}
      className="fixed top-25 right-6 z-50 inline-flex shrink-0 items-center gap-2 rounded-full bg-rose-500 px-4 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.6)] transition-all duration-300 hover:scale-105 hover:bg-rose-600 hover:shadow-[0_14px_40px_-6px_rgba(79,70,229,0.8)] focus:ring-2 focus:ring-rose-500/40 focus:outline-none"
    >
      <ArrowRightLeft size={25} />
    </button>
  );
}
