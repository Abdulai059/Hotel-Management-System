import { Gift, Plus } from "lucide-react";

export default function RatesPackages() {
  const rateData = {
    checkInDate: "02",
    checkInMonth: "Feb",
    checkOutDate: "06",
    checkOutMonth: "Feb",
    nights: "4Nt",
    amount: "800.00",
    rateType: "Seasonal Rate",
    includes: "None",
    addOns: "None",
  };

  return (
    <div className="rounded-lg bg-[#666666] p-2">
      <h2 className="mb-6 text-xl font-medium text-white">Rates / Packages</h2>

      <div className="rounded-lg bg-[#eef4ff] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="min-w-[60px] rounded-lg border-t-4 border-green-500 px-3 py-2 text-center">
              <div className="text-xl font-bold text-gray-900">{rateData.checkInDate}</div>
              <div className="text-xs text-gray-700">{rateData.checkInMonth}</div>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-0.5 w-2 rounded-full bg-gray-300" />
                ))}
              </div>
              <span className="text-sm font-medium">{rateData.nights}</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-0.5 w-2 rounded-full bg-gray-300" />
                ))}
              </div>
            </div>

            <div className="min-w-[60px] rounded-lg border-t-4 border-green-500 px-3 py-2 text-center">
              <div className="text-xl font-bold text-gray-900">{rateData.checkOutDate}</div>
              <div className="text-xs text-gray-700">{rateData.checkOutMonth}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">$ {rateData.amount}</div>
            <div className="text-sm font-medium text-blue-600">{rateData.rateType}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <div className="flex items-center gap-2">
            <Gift size={18} />
            <span className="font-medium">Includes:</span>
            <span className="text-gray-600">{rateData.includes}</span>
          </div>

          <div className="flex items-center gap-2">
            <Plus size={18} />
            <span className="font-medium">Add-ons:</span>
            <span className="text-gray-600">{rateData.addOns}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
