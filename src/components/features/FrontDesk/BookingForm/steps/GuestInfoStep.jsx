import InputField from "../inputField";
import CountrySelect from "@/components/ui/CountrySelect";
import SelectField from "../SelectField";
import { MapPin, User } from "lucide-react";

export default function GuestInfoStep({ formData, onChange, onNext }) {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <User className="h-6 w-6 text-rose-500" />
          <h2 className="text-2xl font-bold text-gray-900">Guest Information</h2>
        </div>
        <p className="text-gray-600">Please provide your personal information</p>
      </div>

      <div className="space-y-10">
        <section>
          <div className="mb-6 flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">Guest Identity</h3>
            <span className="ml-2 h-0.75 w-12 bg-linear-to-l from-transparent to-emerald-500" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Full Name"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              placeholder="Adam Walma"
              required
            />

            <InputField
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              placeholder="055 0000 0000"
              required
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Email Address"
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={onChange}
              placeholder="john@example.com"
              required
            />

            <InputField
              label="National ID / Passport Number"
              id="NationalID"
              name="NationalID"
              value={formData.NationalID}
              onChange={onChange}
              placeholder="Passport Number"
              required
            />
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
            <span className="ml-2 h-0.75 w-12 bg-linear-to-l from-transparent to-sky-500" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Profession or Occupation"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
              placeholder="Software Engineer"
              required
            />

            <SelectField
              label="Marital Status"
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={onChange}
              required
              options={[
                { value: "", label: "Select marital status" },
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
              ]}
            />
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="text-rose-500" />
            <h3 className="text-lg font-bold text-gray-900">Location Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-900">Country</label>
              <CountrySelect />
            </div>

            <InputField
              label="City"
              id="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="Accra"
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
              placeholder="East Legon"
              required
            />

            <InputField
              label="Residential Address"
              id="residentialAddress"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={onChange}
              placeholder="House No. 12, Mango Street"
              required
            />
          </div>
        </section>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
