import { useState, useEffect } from "react";
import { ShieldCheck, DollarSign, AlertTriangle, FileText, TrendingUp, Users } from "lucide-react";

const report = {
  staffName: "John Mensah",
  role: "Front Desk",
  shiftType: "Morning",
  date: "March 1, 2026",
  time: "11:45 AM",
  checkIns: 8,
  checkOuts: 5,
  walkIns: 2,
  occupiedRooms: 24,
  availableRooms: 6,
  cash: 1200,
  card: 800,
  transfer: 500,
  outstandingBalance: 300,
  issues: "Guest in Room 203 complained about AC malfunction. Maintenance notified.",
  notes: "VIP guest arriving tomorrow at 2PM. Room 105 pending cleaning.",
};

const totalPayments = report.cash + report.card + report.transfer;

const occupancyRate = Math.round((report.occupiedRooms / (report.occupiedRooms + report.availableRooms)) * 100);

function AnimatedNumber({ value, prefix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof value === "number" ? value : parseInt(value);
    if (isNaN(end)) {
      setDisplay(value);
      return;
    }

    const step = Math.ceil(end / (900 / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setDisplay(start);
      if (start >= end) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {typeof value === "number" ? display.toLocaleString() : display}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-lg">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">
        <AnimatedNumber value={value} />
      </p>
    </div>
  );
}

export default function ShiftReportView() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shift Report Summary</h1>
            <p className="text-sm text-gray-500">
              {report.date} · {report.time}
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            {report.shiftType} Shift
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-800">Staff Information</h2>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">Name:</span> {report.staffName}
              </p>
              <p>
                <span className="font-medium">Role:</span> {report.role}
              </p>
              <p>
                <span className="font-medium">Shift:</span> {report.shiftType}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Occupancy</span>
                <span className="font-semibold text-indigo-600">{occupancyRate}%</span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-1000"
                  style={{
                    width: visible ? `${occupancyRate}%` : "0%",
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {report.occupiedRooms} occupied · {report.availableRooms} available
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <h2 className="font-semibold text-gray-800">Guest Activity</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <StatCard label="Check-ins" value={report.checkIns} />
              <StatCard label="Check-outs" value={report.checkOuts} />
              <StatCard label="Walk-ins" value={report.walkIns} />
              <StatCard label="Occupied" value={report.occupiedRooms} />
              <StatCard label="Available" value={report.availableRooms} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600" />
            <h2 className="font-semibold text-gray-800">Financial Summary</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 text-sm text-gray-700">
              <FinancialRow label="Cash" value={report.cash} />
              <FinancialRow label="Card" value={report.card} />
              <FinancialRow label="Transfer" value={report.transfer} />
              <FinancialRow label="Outstanding" value={report.outstandingBalance} />
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl bg-blue-50 p-6 text-center shadow-inner">
              <p className="text-xs text-gray-500 uppercase">Total Collected</p>
              <p className="mt-2 text-4xl font-extrabold text-blue-600">
                <AnimatedNumber value={totalPayments} prefix="$" />
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp size={14} />
                Morning Shift Total
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard
            icon={<AlertTriangle size={18} className="text-orange-500" />}
            title="Issues & Incidents"
            content={report.issues}
          />
          <InfoCard
            icon={<FileText size={18} className="text-purple-600" />}
            title="Notes for Next Shift"
            content={report.notes}
          />
        </div>

        <p className="text-center text-xs text-gray-400">
          Report logged · {report.date} {report.time} · {report.staffName}
        </p>
      </div>
    </div>
  );
}

function FinancialRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span>{label}</span>
      <span className="font-semibold">
        <AnimatedNumber value={value} prefix="$" />
      </span>
    </div>
  );
}

function InfoCard({ icon, title, content }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-700">{content || "No information provided."}</p>
    </div>
  );
}
