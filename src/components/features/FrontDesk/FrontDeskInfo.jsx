function FrontDeskInfo() {
  return (
    <div className="mx-auto w-4xl rounded border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Booking Form</h2>
          <p className="text-sm text-gray-600">Find and book your perfect hotel with ease</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Desk</span>
            <span className="font-semibold text-sky-600">Main Lobby</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Time</span>
            <span className="font-semibold text-slate-700">08:00 AM</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Duty</span>
            <span className="inline-flex rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              On Duty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontDeskInfo;
