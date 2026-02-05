import SelectField from "../SelectField";

export default function RoomDetailsStep({ formData, onChange, onBack }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-3">
        <svg className="h-6 w-6 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Room Details</h2>
      </div>

      <p className="mb-6 text-sm text-gray-600 sm:text-base">Select your room type and guest count</p>

      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <SelectField
            label="Room Type"
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={onChange}
            required
            options={[
              { value: "", label: "Select room type", disabled: true },
              { value: "standard", label: "Standard Room" },
              { value: "deluxe", label: "Deluxe Room" },
              { value: "suite", label: "Suite" },
              { value: "presidential", label: "Presidential Suite" },
            ]}
          />

          <SelectField
            label="Number of Rooms"
            id="numberOfRooms"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={onChange}
            required
            options={[1, 2, 3, 4, 5].map((n) => ({
              value: `${n}`,
              label: `${n}`,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <SelectField
            label="Number of Adults"
            id="numberOfAdults"
            name="numberOfAdults"
            value={formData.numberOfAdults}
            onChange={onChange}
            required
            options={[1, 2, 3, 4].map((n) => ({
              value: `${n}`,
              label: `${n}`,
            }))}
          />

          <SelectField
            label="Number of Children"
            id="numberOfChildren"
            name="numberOfChildren"
            value={formData.numberOfChildren}
            onChange={onChange}
            options={[0, 1, 2, 3, 4, 5].map((n) => ({
              value: `${n}`,
              label: `${n}`,
            }))}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600 sm:w-auto"
        >
          Back
        </button>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
}
