import { useSearchParams } from "react-router";

export function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) ?? options[0].value;

  function handleChange(e) {
    const value = e.target.value;

    searchParams.set(filterField, value);

    // reset pagination if present
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
  }

  return (
    <select
      value={currentFilter}
      onChange={handleChange}
      className="w-36 rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:ring-2 focus:ring-sky-700 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
