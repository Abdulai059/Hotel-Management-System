function InfoField({ label, value, inline }) {
  const containerClass = inline ? "flex gap-4" : "";
  return (
    <div className={containerClass}>
      <span className={inline ? "inline-block text-sm text-gray-600" : "text-sm text-gray-600"}>{label}:</span>
      <p className="text-gray-800">{value || "-"}</p>
    </div>
  );
}

export default InfoField;
