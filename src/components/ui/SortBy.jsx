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
            className="border border-gray-200 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
