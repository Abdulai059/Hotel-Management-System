import BookingingSlider from "@/components/ui/BookingingSlider";
import BookingTableOperations from "@/components/ui/BookingTableOperations";
import { SearchInput } from "@/components/ui/SearchInput";
import { Filter } from "lucide-react";

export default function GuestNav() {
  return (
    <div className="w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl">
      <div className="mr-25 px-6 py-5">
        <div className="mb-4 text-sm font-semibold text-gray-500 uppercase">All Guests</div>
        <div className="flex items-center justify-between gap-4">
          <BookingTableOperations />
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            <SearchInput />
          </div>
        </div>
      </div>

      {/* <BookingingSlider /> */}
    </div>
  );
}
