import InputField from "../inputField";

export default function GuestInfoStep({ formData, onChange, onNext }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        <svg className="h-6 w-6 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Guest Information</h2>
      </div>
      <p className="mb-8 text-gray-600">Please provide your personal information</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>

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
      </div>

      <div className="mt-8 flex justify-end">
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
