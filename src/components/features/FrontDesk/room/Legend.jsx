import { LegendItem } from "./LegendItem";

export function Legend() {
  return (
    <div className="flex gap-6 rounded bg-white p-4 shadow-sm">
      <LegendItem color="bg-emerald-500" label="Available" />
      <LegendItem color="bg-rose-500" label="Occupied" />
      <LegendItem color="bg-amber-500" label="Maintenance" />
    </div>
  );
}
