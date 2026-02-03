export default function StatCard({ label, value, color, icon: Icon }) {
  return (
    <div className="flex min-w-35 items-center gap-4 rounded-2xl border border-white bg-white/50 px-5 py-3 shadow-sm backdrop-blur-md">
      <div className={`rounded-xl bg-white p-2 shadow-sm ${color}`}>{Icon && <Icon />}</div>
      <div className="flex flex-col">
        <span className="mb-1 text-[10px] leading-none font-bold tracking-wider text-slate-400 uppercase">{label}</span>
        <span className={`text-xl leading-none font-black ${color}`}>{value}</span>
      </div>
    </div>
  );
}
