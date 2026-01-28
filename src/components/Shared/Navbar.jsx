import { Hotel } from "lucide-react";


export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-375 mx-auto px-0 py-2">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <Hotel className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-semibold text-gray-800">Hotel Management System</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
