import { FileText, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex min-w-[220px] flex-1 items-center gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Orders</span>
          <div className="flex items-center gap-2">
            <span className="truncate text-2xl font-bold text-gray-900">48,652</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>1.58%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-[220px] flex-1 items-center gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
          <Users className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Customer</span>
          <div className="flex items-center gap-2">
            <span className="truncate text-2xl font-bold text-gray-900">1248</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-red-600">
              <TrendingDown className="h-3 w-3" />
              <span>0.42%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-w-[220px] flex-1 items-center gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
          <DollarSign className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Revenue</span>
          <div className="flex items-center gap-2">
            <span className="truncate text-2xl font-bold text-gray-900">$215,860</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>2.36%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
