import { useState } from "react";
import { MoreHorizontal, Plus, Check, CalendarCheck, LogOut, Sparkles } from "lucide-react";

const RATINGS = [
  { label: "Facilities", value: 4.4 },
  { label: "Cleanliness", value: 2.7 },
  { label: "Services", value: 4.6 },
  { label: "Comfort", value: 1.8 },
  { label: "Location", value: 3.5 },
];

const TASKS = [
  { id: 1, date: "June 19, 2028", title: "Set Up Conference Room B for 10 AM Meeting" },
  { id: 2, date: "June 19, 2028", title: "Restock Housekeeping Supplies on 3rd Floor" },
  { id: 3, date: "June 20, 2028", title: "Inspect and Clean the Pool Area" },
  { id: 4, date: "June 20, 2028", title: "Check-In Assistance During Peak Hours (4 PM - 6 PM)" },
];

const ACTIVITIES = [
  {
    id: 1,
    time: "12:00 PM",
    icon: CalendarCheck,
    iconBg: "bg-blue-100 text-blue-500",
    title: "Conference Room Setup",
    description: "Events Team set up Conference Room B for 10 AM meeting, including AV equipment and refreshments.",
  },
  {
    id: 2,
    time: "11:30 AM",
    icon: LogOut,
    iconBg: "bg-orange-100 text-orange-500",
    title: "Guest Check-Out",
    description: "Sarah Johnson completed check-out process and updated room availability for Room 305.",
  },
  {
    id: 3,
    time: "10:00 AM",
    icon: Sparkles,
    iconBg: "bg-green-100 text-green-500",
    title: "Room Cleaning Completed",
    description: "Maria Gonzalez cleaned and prepared Room 204 for new guests.",
  },
];

function RatingBar({ value }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ccd97f]">
      <div
        className="bg-btn-green h-full rounded-full transition-all duration-700"
        style={{ width: `${(value / 5) * 100}%` }}
      />
    </div>
  );
}

function SectionHeader({ title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      {action}
    </div>
  );
}

function IconButton({ onClick, children, className = "" }) {
  return (
    <button onClick={onClick} className={`transition-colors ${className}`}>
      {children}
    </button>
  );
}

export default function DashboardSidebar() {
  const [tasks, setTasks] = useState(() => TASKS.map((t) => ({ ...t, done: false })));

  const toggleTask = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <aside className="top-4 flex w-full shrink-0 flex-col gap-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <SectionHeader
          title="Overall Rating"
          action={
            <IconButton className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </IconButton>
          }
        />
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary flex h-14 w-16 items-center justify-center rounded-lg text-xl font-bold text-[#4a6000]">
            4.6
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Impressive</p>
            <p className="text-xs text-gray-500">from 2546 reviews</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {RATINGS.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-20 text-xs text-gray-500">{label}</span>
              <div className="flex-1">
                <RatingBar value={value} />
              </div>
              <span className="w-6 text-right text-xs font-medium text-gray-600">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <SectionHeader
          title="Tasks"
          action={
            <IconButton className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e7f68f] text-[#3a4a00] hover:bg-[#9dc43b]">
              <Plus size={14} strokeWidth={2.5} />
            </IconButton>
          }
        />

        <div className="flex flex-col gap-2">
          {tasks.map((task, idx) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-colors ${
                task.done ? "bg-gray-50 opacity-60" : idx % 2 === 0 ? "bg-[#d5f6e5]" : "bg-[#e7f68f]"
              }`}
            >
              <div className="min-w-0">
                <p className="mb-0.5 text-[10px] text-gray-400">{task.date}</p>
                <p
                  className={`text-xs leading-snug font-medium ${
                    task.done ? "text-gray-400 line-through" : "text-gray-700"
                  }`}
                >
                  {task.title}
                </p>
              </div>
              <IconButton className="ml-auto flex-shrink-0 text-gray-300 hover:text-gray-500">
                <MoreHorizontal size={14} />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <SectionHeader
          title="Recent Activities"
          action={
            <IconButton className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </IconButton>
          }
        />
        <div className="flex flex-col">
          {ACTIVITIES.map(({ id, time, icon: Icon, iconBg, title, description }, index) => (
            <div key={id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                  <Icon size={14} strokeWidth={1.8} />
                </div>
                {index < ACTIVITIES.length - 1 && <div className="my-1 w-px flex-1 bg-gray-200" />}
              </div>
              <div className={`min-w-0 ${index < ACTIVITIES.length - 1 ? "pb-4" : ""}`}>
                <p className="mb-0.5 text-[10px] text-gray-400">{time}</p>
                <p className="text-xs font-semibold text-gray-700">{title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
