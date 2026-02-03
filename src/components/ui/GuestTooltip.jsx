export default function GuestTooltip({ guest }) {
  if (!guest) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 transform rounded-xl border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-200">
      <div className="flex flex-col gap-3">
        <div className="border-b border-slate-100 pb-2">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Current Guest</p>
          <p className="text-sm font-bold text-slate-800">{guest.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase">Check-In</p>
            <p className="text-xs font-semibold text-slate-700">{guest.checkIn}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400 uppercase">Check-Out</p>
            <p className="text-xs font-semibold text-slate-700">{guest.checkOut}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-rose-50 px-2 py-1.5">
          <span className="text-[10px] font-bold text-rose-600 uppercase">Duration</span>
          <span className="text-xs font-bold text-rose-700">{guest.nights} Nights</span>
        </div>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
    </div>
  );
}
