import { useSearchParams } from "react-router";

export function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      value={sortBy}
      onChange={handleChange}
      className="w-32 rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-sky-700 focus:outline-none"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
