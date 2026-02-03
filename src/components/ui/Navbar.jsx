export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-375 px-0 py-2">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl">
              <span className="text-xl font-black">LS</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Global Dream</h1>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Hotel Operations Live</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              AD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
