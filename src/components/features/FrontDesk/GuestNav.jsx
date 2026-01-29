import { useState } from "react";
import { Filter, Search, Menu } from "lucide-react";
import Button from "@/components/ui/Button";

function SearchInput({ value, onChange }) {
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

export default function GuestNav() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="w-full bg-gray-50 border-b border-gray-200 px-4 md:px-6 py-4">
            <h2 className="text-sm mb-4 font-medium uppercase text-gray-600 md:mb-6">
                Guests Information!
            </h2>

            {/* Mobile Dropdown */}
            <div className="flex md:hidden justify-between items-center mb-4">
                <Button
                    label="Menu"
                    icon={<Menu size={16} />}
                    onClick={toggleDropdown}
                    variant="primary"
                    size="sm"
                />
            </div>

            {/* Dropdown content */}
            {showDropdown && (
                <div className="flex flex-col gap-3 mb-4 md:hidden">
                    <div className="flex gap-3 flex-wrap">
                        <Button
                            label="Check in"
                            onClick={() => {
                                setActiveTab("check-in");
                                setShowDropdown(false);
                            }}
                            variant={activeTab === "check-in" ? "primary" : "ghost"}
                            size="sm"
                        />
                        <Button
                            label="Check out"
                            onClick={() => {
                                setActiveTab("check-out");
                                setShowDropdown(false);
                            }}
                            variant={activeTab === "check-out" ? "primary" : "ghost"}
                            size="sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 justify-center">
                            <Filter size={16} />
                            Filter
                        </button>
                        <SearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-6">
                <div className="flex gap-3">
                    <Button
                        label="All"
                        onClick={() => setActiveTab("All")}
                        variant={activeTab === "All" ? "primary" : "ghost"}
                        size="sm"
                    />
                    <Button
                        label="Unconfirmed"
                        onClick={() => setActiveTab("unconfirmed")}
                        variant={activeTab === "unconfirmed" ? "primary" : "ghost"}
                        size="sm"
                    />
                    <Button
                        label="Check in"
                        onClick={() => setActiveTab("check-in")}
                        variant={activeTab === "check-in" ? "primary" : "ghost"}
                        size="sm"
                    />
                    <Button
                        label="Check out"
                        onClick={() => setActiveTab("check-out")}
                        variant={activeTab === "check-out" ? "primary" : "ghost"}
                        size="sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <Filter size={16} />
                        Filter
                    </button>

                    <SearchInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
