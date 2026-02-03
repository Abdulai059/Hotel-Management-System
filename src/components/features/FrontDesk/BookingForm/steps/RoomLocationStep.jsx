import { Locate, MapPin } from "lucide-react";
import InputField from "../inputField";
import SelectField from "../SelectField";

export default function RoomLocationStep({ formData, onChange, onBack }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <svg className="h-6 w-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Room & Location</h2>
      </div>
      <p className="mb-8 text-gray-600">Choose your room type and location</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectField
            label="Room Type"
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={onChange}
            required
            options={[
              { value: "", label: "Select room type" },
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
            options={[...Array(5)].map((_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectField
            label="Number of Adults"
            id="numberOfAdults"
            name="numberOfAdults"
            value={formData.numberOfAdults}
            onChange={onChange}
            required
            options={[...Array(5)].map((_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }))}
          />
          <SelectField
            label="Number of Children"
            id="numberOfChildren"
            name="numberOfChildren"
            value={formData.numberOfChildren}
            onChange={onChange}
            required
            options={[...Array(6)].map((_, i) => ({ value: `${i}`, label: `${i}` }))}
          />
        </div>

        <div className="pt-4">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="text-rose-500" />
            <h3 className="text-lg font-bold text-gray-900">Location Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectField
              label="Country"
              id="country"
              name="country"
              value={formData.country}
              onChange={onChange}
              required
              options={[
                { value: "", label: "Select country" },
                { value: "usa", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "canada", label: "Canada" },
                { value: "australia", label: "Australia" },
              ]}
            />
            <InputField
              label="City"
              id="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="New York"
              required
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Town"
              id="town"
              name="town"
              value={formData.town}
              onChange={onChange}
              placeholder="Manhattan"
              required
            />
            <InputField
              label="Residential Address"
              id="residentialAddress"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={onChange}
              placeholder="123 Main Street"
              required
            />
          </div>
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
          type="submit"
          className="rounded-lg border-emerald-600 bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );
}
