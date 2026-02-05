import { useEffect, useState } from "react";

export default function CountrySelect({ onSelect }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2")
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c) => ({
            code: c.cca2,
            name: c.name.common,
            flag: c.flags.svg,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(list);
        setFilteredCountries(list);

        // Default to Ghana
        const ghana = list.find((c) => c.code === "GH");
        if (ghana) {
          setSelected(ghana);
          onSelect?.(ghana);
        }
      });
  }, [onSelect]);

  // Filter countries as user types
  useEffect(() => {
    if (search === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, countries]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <img src={selected?.flag} className="h-4 w-6 rounded-sm" />
          <span>{selected?.name || "Select country"}</span>
        </div>
        <span className="text-gray-500">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full max-w-full rounded-sm border border-gray-100 bg-white shadow-lg">
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:ring-0 focus:outline-none"
          />

          <ul className="max-h-60 overflow-auto">
            {filteredCountries.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  setSelected(c);
                  setOpen(false);
                  setSearch("");
                  onSelect?.(c);
                }}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
              >
                <img src={c.flag} className="h-4 w-6 rounded-sm" />
                <span>{c.name}</span>
              </li>
            ))}

            {filteredCountries.length === 0 && <li className="px-3 py-2 text-gray-400">No countries found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
