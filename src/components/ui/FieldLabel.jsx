export function FieldLabel({ children }) {
  return <p className="mb-1 text-[11px] tracking-wide text-gray-400 uppercase">{children}</p>;
}

export function FieldValue({ children, className = "" }) {
  return <p className={`text-sm font-medium text-gray-800 ${className}`}>{children}</p>;
}

export function CardHeader({ title, right }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <span className="text-sm font-bold tracking-widest text-gray-700 uppercase">{title}</span>
      {right ?? <span className="cursor-pointer text-xl tracking-widest text-gray-300">···</span>}
    </div>
  );
}
