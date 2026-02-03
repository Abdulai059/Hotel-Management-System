const ACTIVE_STYLES = {
  slate: "bg-slate-900 text-white border-slate-900 shadow-slate-200",
  emerald: "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200",
  rose: "bg-rose-600 text-white border-rose-600 shadow-rose-200",
  amber: "bg-amber-600 text-white border-amber-600 shadow-amber-200",
};

export default function FilterButton({ children, active, onClick, color = "slate" }) {
  const activeStyle = ACTIVE_STYLES[color] ?? ACTIVE_STYLES.slate;
  const buttonClass = active
    ? `${activeStyle} shadow-lg -translate-y-0.5`
    : "bg-gray-100 text-slate-600 border-gray-200 hover:bg-slate-50";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-32 rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200 focus:ring-2 focus:ring-gray-500/40 focus:outline-none ${buttonClass}`}
    >
      {children}
    </button>
  );
}
