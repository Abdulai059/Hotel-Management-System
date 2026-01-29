import BookingTableOperations from "@/components/ui/BookingTableOperations";

export default function BookingsNav() {
    return (
        <div className="w-full bg-white border-b border-gray-200">
            <div className="px-6 py-5">

                <div className="mb-4 text-sm font-semibold uppercase text-gray-500">
                    All Rooms
                </div>


                <div className="flex items-center justify-between gap-4">

                    <BookingTableOperations />


                    <button className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-indigo-600 text-white text-sm font-semibold shadow-sm
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40
            transition"
                    >
                        + Bookings
                    </button>
                </div>
            </div>
        </div>
    )
}
