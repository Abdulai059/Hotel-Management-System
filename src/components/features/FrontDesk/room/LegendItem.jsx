export function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${color}`} />
      <span className="text-sm text-slate-700">{label}</span>
    </div>
  );
}
