function SummaryField({ label, value }) {
  return (
    <div>
      <p className="mb-1 font-semibold text-gray-800">{label}</p>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}

export default SummaryField;
