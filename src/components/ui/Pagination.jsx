export function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-gray-300 bg-gray-50 px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Page</span>
        <select className="rounded border border-gray-300 px-2 py-1 text-sm">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <span className="text-sm text-gray-700">of 1</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">View</span>
        <select className="rounded border border-gray-300 px-2 py-1 text-sm">
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>
        <span className="text-sm text-gray-700">records per page</span>
      </div>
    </div>
  );
}
