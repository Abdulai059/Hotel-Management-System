import { Search } from "lucide-react";


export function SearchInput({ value, onChange }) {
    return (
        <div className="relative w-full md:w-64">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search by room number"
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}
