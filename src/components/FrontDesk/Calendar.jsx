import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Loader2 } from "lucide-react";
import { useSchedules } from "@/services/getSchedules";

const CATEGORIES = [
  { label: "Training", color: "#7dd3b0", bg: "bg-[#d5f6e5]", dot: "bg-[#7dd3b0]" },
  { label: "Meeting", color: "#a8d5b5", bg: "bg-[#c8eeda]", dot: "bg-[#a8d5b5]" },
  { label: "Guest Service", color: "#e6f58e", bg: "bg-[#f0faa0]", dot: "bg-[#e6f58e]" },
  { label: "Maintenance", color: "#b8e0c8", bg: "bg-[#d5f6e5]", dot: "bg-[#b8e0c8]" },
  { label: "Event", color: "#d4f0a0", bg: "bg-[#e7f68f]", dot: "bg-[#e7f68f]" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MINI_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getCategoryStyle(category) {
  return CATEGORIES.find((cat) => cat.label === category) || CATEGORIES[0];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatTime(schedule) {
  if (!schedule.start_time) return "";
  if (!schedule.end_time) return schedule.start_time;
  return `${schedule.start_time} - ${schedule.end_time}`;
}

function EventCard({ schedule }) {
  const style = getCategoryStyle(schedule.category);
  return (
    <div className={`mb-1 cursor-pointer rounded-lg p-2 ${style.bg} transition-opacity hover:opacity-80`}>
      <p className="text-[10px] font-medium text-gray-500">{formatTime(schedule)}</p>
      <p className="mt-0.5 text-xs leading-snug font-semibold text-gray-800">{schedule.title}</p>
      <p className="mt-2 text-[10px] text-gray-500">{schedule.category}</p>
    </div>
  );
}

function MiniCalendar({ year, month, today, onDayClick }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevDays = getDaysInMonth(year, month - 1);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, current: false });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - firstDay + 1, current: false });

  return (
    <div>
      <div className="mb-1 grid grid-cols-7">
        {MINI_DAYS.map((day) => (
          <div key={day} className="py-1 text-center text-[10px] font-semibold text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cell, index) => {
          const isToday =
            cell.current && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          return (
            <button
              key={index}
              onClick={() => cell.current && onDayClick(cell.day)}
              className={`flex aspect-square items-center justify-center rounded-full text-xs transition-colors ${!cell.current ? "text-gray-300" : "hover:bg-btn-green text-gray-700"} ${isToday ? "bg-btn-green font-bold text-gray-800" : ""}`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ScheduleCalendar() {
  const today = new Date();
  const [year, setYear] = useState(2028);
  const [month, setMonth] = useState(5);
  const [view, setView] = useState("Month");
  const [selectedCategory, setSelectedCategory] = useState("All Category");

  const { data: schedules = [], isLoading } = useSchedules(year, month);
  console.log(schedules);

  const prevMonthDays = getDaysInMonth(year, month - 1);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const getSchedulesForDay = (day) => {
    const key = formatDateKey(year, month, day);
    return schedules.filter((schedule) => {
      const scheduleDate = schedule.event_date?.slice(0, 10);
      if (scheduleDate !== key) return false;
      if (selectedCategory !== "All Category" && schedule.category !== selectedCategory) return false;
      return true;
    });
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevMonthDays - firstDay + 1 + i, current: false });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - firstDay + 1, current: false });

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="flex bg-white font-sans">
      {/* Left sidebar */}
      <div className="flex w-56 shrink-0 flex-col gap-6 border-r border-gray-200 bg-gray-50 px-4 py-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <button onClick={prevMonth} className="rounded-full p-1 transition-colors hover:bg-gray-200">
              <ChevronLeft size={14} className="text-gray-500" />
            </button>
            <span className="text-sm font-semibold text-gray-800">
              {MONTHS[month]} {year}
            </span>
            <button onClick={nextMonth} className="rounded-full p-1 transition-colors hover:bg-gray-200">
              <ChevronRight size={14} className="text-gray-500" />
            </button>
          </div>
          <MiniCalendar year={year} month={month} today={today} onDayClick={() => {}} />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">Category</span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(selectedCategory === cat.label ? "All Category" : cat.label)}
                className={`flex items-center gap-2 text-left text-sm transition-opacity ${
                  selectedCategory !== "All Category" && selectedCategory !== cat.label ? "opacity-40" : ""
                }`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-gray-700">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main calendar */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <h1 className="text-lg font-semibold text-gray-800">Schedule</h1>
          <div className="flex items-center gap-1">
            {["Day", "Week", "Month"].map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => setView(viewOption)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === viewOption ? "bg-btn-green text-gray-800" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {viewOption}
              </button>
            ))}
            <div className="mx-2 h-5 w-px bg-gray-200" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:outline-none"
            >
              <option>All Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.label}>{cat.label}</option>
              ))}
            </select>
            <button className="ml-2 flex items-center gap-1.5 rounded-sm bg-[#e7f68f] px-4 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-[#d4e87a]">
              <Plus size={14} />
              Add Schedule
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-white">
            {DAYS.map((day) => (
              <div
                key={day}
                className="border-r border-gray-100 py-2 text-center text-xs font-semibold text-gray-500 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="flex-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7" style={{ minHeight: "120px" }}>
                  {week.map((cell, dayIndex) => {
                    const daySchedules = cell.current ? getSchedulesForDay(cell.day) : [];
                    const isToday =
                      cell.current &&
                      cell.day === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();
                    return (
                      <div
                        key={dayIndex}
                        className={`border-r border-b border-gray-200 p-2 last:border-r-0 ${!cell.current ? "bg-gray-50/50" : "bg-white"}`}
                      >
                        <div
                          className={`mb-1.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                            isToday
                              ? "bg-btn-green font-bold text-gray-800"
                              : cell.current
                                ? "text-gray-700"
                                : "text-gray-300"
                          }`}
                        >
                          {cell.day}
                        </div>
                        <div className="space-y-1">
                          {daySchedules.map((schedule) => (
                            <EventCard key={schedule.id} schedule={schedule} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
