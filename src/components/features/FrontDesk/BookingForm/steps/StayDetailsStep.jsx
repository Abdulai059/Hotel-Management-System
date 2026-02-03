import InputField from "../inputField";

export default function StayDetailsStep({ formData, onChange, onNext, onBack }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <svg className="h-6 w-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
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
        <InputField
          label="Check-in Date"
          type="date"
          id="checkInDate"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={onChange}
          required
        />
        <InputField
          label="Check-out Date"
          type="date"
          id="checkOutDate"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={onChange}
          required
        />
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
