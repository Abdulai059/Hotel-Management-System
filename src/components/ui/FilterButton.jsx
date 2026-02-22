const ACTIVE_STYLES = {
  slate: "bg-[#9dc43b] text-white border-[#9dc43b] shadow-[#9dc43b]/20",
  emerald: "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200",
  rose: "bg-rose-600 text-white border-rose-600 shadow-rose-200",
  amber: "bg-amber-600 text-white border-amber-600 shadow-amber-200",
};

export default function FilterButton({ children, active, onClick, color = "slate" }) {
  const activeStyle = ACTIVE_STYLES[color] ?? ACTIVE_STYLES.slate;
  const buttonClass = active
    ? `${activeStyle} shadow-lg -translate-y-0.5`
    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-200 focus:outline-none ${buttonClass}`}
    >
      {children}
    </button>
  );
}
