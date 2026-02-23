export default function TableHeader({ headers }) {
  return (
    <thead className="hidden lg:table-header-group">
      <tr className="border-b-2 border-gray-300 bg-gray-100">
        {headers.map((header, idx) => {
          const Icon = header.icon;

          return (
            <th
              key={idx}
              className={` ${!header.noBorder ? "border-r border-gray-300" : ""} px-3 py-3 text-xs font-bold tracking-wide text-gray-700 uppercase ${header.center ? "text-center" : header.right ? "text-right" : "text-left"} ${header.noPrint ? "no-print" : ""} `}
            >
              {header.type === "checkbox" ? (
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              ) : (
                <div className="flex items-center gap-1.5">
                  {Icon && <Icon size={13} />}
                  {header.label}
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
