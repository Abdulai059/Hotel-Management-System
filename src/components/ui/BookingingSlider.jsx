import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import BookingForm from "../features/FrontDesk/BookingForm/BookingForm";

export default function BookingingSlider() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ animation: "float 3s ease-in-out infinite" }}
        className="fixed top-24 right-6 z-50 flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-600 to-sky-700 px-4 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500/40 focus:outline-none"
      >
        <ArrowRightLeft size={25} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            <button
              className="absolute top-3 right-3 z-50 mr-3 rounded-sm bg-rose-50 p-2 text-3xl text-rose-600 shadow-md transition hover:bg-rose-100 hover:text-rose-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-10">
              <BookingForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
