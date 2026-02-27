function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function StayDetailsStep({ formData, onChange, onNext, onBack }) {
  const numNights = calculateNights(formData.checkInDate, formData.checkOutDate);

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <svg className="h-6 w-6 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Stay Details</h2>
      </div>
      <p className="mb-8 text-gray-600">Select your check-in and check-out dates</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="checkInDate" className="mb-2 block text-sm font-semibold text-gray-900">
            Check-in Date
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={onChange}
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="checkOutDate" className="mb-2 block text-sm font-semibold text-gray-900">
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={onChange}
            min={formData.checkInDate || new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
          />
        </div>
      </div>

      {numNights > 0 && (
        <div className="mt-4 rounded-lg bg-sky-50 px-4 py-3 font-medium text-sky-700">
          {numNights} night{numNights !== 1 ? "s" : ""}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="numGuests" className="mb-2 block text-sm font-semibold text-gray-900">
            Number of Guests
          </label>
          <input
            type="number"
            id="numGuests"
            name="numGuests"
            value={formData.numGuests}
            onChange={onChange}
            min={1}
            required
            className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Booking Type <span className="text-red-500">*</span>
          </label>
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={onChange}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
            required
          >
            <option value="">Select type</option>
            <option value="WALK_IN">Walk-in</option>
            <option value="ONLINE">Online</option>
            <option value="CORPORATE">Corporate</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border-2 border-rose-600 bg-rose-500 px-8 py-3 font-semibold text-white transition hover:border-transparent hover:bg-red-600 hover:text-white"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg border-emerald-600 bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
