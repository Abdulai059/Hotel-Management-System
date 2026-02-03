export default function ConfirmationScreen({ formData, calculateNights, onNewBooking }) {
  return (
    <div className="py-8 text-center">
      <div className="animate-in fade-in mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl duration-500">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-slate-800">Registration Successful!</h2>
        <p className="mb-8 leading-relaxed text-slate-500">
          Thank you, <span className="font-semibold text-rose-500">{formData.fullName}</span>. Your request for a{" "}
          <span className="font-semibold text-amber-600">{formData.roomType}</span> room for{" "}
          <span className="font-semibold text-sky-600">{formData.durationOfStay} nights</span> has been received. We'll
          contact you at <span className="italic">{formData.email}</span> shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(INITIAL_DATA);
          }}
          className="rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700"
        >
          Book Another Stay
        </button>
      </div>
    </div>
  );
}
