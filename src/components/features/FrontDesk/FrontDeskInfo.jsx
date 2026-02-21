function FrontDeskInfo() {
  return (
    <div className="px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Booking Form</h2>
          <p className="text-xs text-gray-400">Find and book your perfect room with ease</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">Desk</span>
            <span className="text-sm font-semibold text-gray-700">Main Lobby</span>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">Time</span>
            <span className="text-sm font-semibold text-gray-700">08:00 AM</span>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">Duty</span>
            <span className="bg-primary inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              On Duty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontDeskInfo;
