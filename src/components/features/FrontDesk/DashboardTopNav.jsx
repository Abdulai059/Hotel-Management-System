import React from 'react';

const DashboardTopNav = () => {
    // Get current date
    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date();
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                
                <div className="text-sm text-gray-600">
                    {getCurrentDate()}
                </div>

              
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                    Create booking
                </button>
            </div>
        </div>
    );
};

export default DashboardTopNav;