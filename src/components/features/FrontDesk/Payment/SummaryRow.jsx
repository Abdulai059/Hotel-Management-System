function SummaryRow({ label, value, bold, border, large }) {
  const baseClass = "flex justify-between py-1";
  const borderClass = border ? "border-t border-gray-300 py-2" : "";
  const fontClass = bold ? "font-semibold" : "";
  const sizeClass = large ? "text-sm font-bold sm:text-base" : "";
  const valueClass = bold || large ? "" : "font-medium";

  return (
    <div className={`${baseClass} ${borderClass} ${fontClass} ${sizeClass}`}>
      <span className={bold || large ? "" : "text-gray-700"}>{label}</span>
      <span className={valueClass}>$ {value.toFixed(2)}</span>
    </div>
  );
}

export default SummaryRow;
