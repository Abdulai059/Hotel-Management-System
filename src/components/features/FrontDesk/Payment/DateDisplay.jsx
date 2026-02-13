function DateDisplay({ label, date }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{label}:</span>
      <span className="font-semibold text-yellow-300">{date}</span>
    </div>
  );
}

export default DateDisplay;
