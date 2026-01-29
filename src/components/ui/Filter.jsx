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
        <div className="flex gap-2 flex-wrap">
            {options.map((option) => {
                const active = currentFilter === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => handleClick(option.value)}
                        disabled={active}
                        className={`px-3 py-1 rounded-md font-medium text-sm transition
              ${active ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-600 hover:text-white"}`}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
