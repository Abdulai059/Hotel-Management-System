import CountrySelect from "@/components/ui/CountrySelect";
import { MapPin, User } from "lucide-react";

export default function GuestInfoStep({ formData, onChange, onNext }) {
  const handleCountrySelect = (country) => {
    onChange({ target: { name: "country", value: country.name } });
  };

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
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-900">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Adam Walma"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="055 0000 0000"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="john@example.com"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="nationalId" className="mb-2 block text-sm font-semibold text-gray-900">
                National ID / Passport Number
              </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                onChange={onChange}
                placeholder="Passport Number"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">Personal Details</h3>
            <span className="ml-2 h-0.75 w-12 bg-linear-to-l from-transparent to-sky-500" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="occupation" className="mb-2 block text-sm font-semibold text-gray-900">
                Profession or Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={onChange}
                placeholder="Software Engineer"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gender" className="mb-2 block text-sm font-semibold text-gray-900">
                Select Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={onChange}
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 ring-sky-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
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
              <CountrySelect onSelect={handleCountrySelect} />
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-semibold text-gray-900">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="Accra"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="town" className="mb-2 block text-sm font-semibold text-gray-900">
                Town
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                onChange={onChange}
                placeholder="East Legon"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-gray-900">
                Residential Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="House No. 12, Mango Street"
                required
                className="w-full rounded-lg border-0 bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 focus:outline-none"
              />
            </div>
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
