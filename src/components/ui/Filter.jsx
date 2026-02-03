import { useSearchParams } from "react-router";

export function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = currentFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={active}
            className={`w-32 rounded-full border border-gray-300 px-3 py-2 text-xs font-medium transition ${active ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
