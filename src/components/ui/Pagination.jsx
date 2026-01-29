import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export default function Pagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 7;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const renderPageNumbers = () =>
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded ${currentPage === page ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                {page}
            </button>
        ));


    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-200">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
                    }`}
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            <div className="flex items-center gap-1 overflow-x-auto">{renderPageNumbers()}</div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
                    }`}
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    )
}
