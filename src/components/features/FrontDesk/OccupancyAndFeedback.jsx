import { useState } from 'react';
import { Calendar, MoreVertical } from 'lucide-react';

const OccupancyAndFeedback = () => {
    const [timeframe] = useState('Monthly');

    const occupancyData = [
        { month: 'May', value: 85 },
        { month: 'Jun', value: 70 },
        { month: 'Jul', value: 82 },
        { month: 'Aug', value: 48 },
        { month: 'Sep', value: 95 },
        { month: 'Oct', value: 88 },
        { month: 'Nov', value: 90 },
        { month: 'Dec', value: 85 },
        { month: 'Jan', value: 92 },
        { month: 'Feb', value: 95 }
    ];

    const feedbackData = [
        { name: 'Mark', comment: 'Food could be better.', room: 'A201' },
        { name: 'Christian', comment: 'Facilities are not enough for amount paid.', room: 'A101' },
        { name: 'Alexander', comment: 'Room cleaning could be better.', room: 'A301' }
    ];

    const maxValue = Math.max(...occupancyData.map(item => item.value));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Occupancy */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Occupancy Statistics
                    </h2>

                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Calendar size={16} />
                        {timeframe}
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
                        {['100%', '75%', '50%', '25%', '0%'].map(label => (
                            <span key={label}>{label}</span>
                        ))}
                    </div>

                    <div className="ml-12 pl-4 border-l border-gray-200">
                        <div className="flex items-end justify-between gap-2 h-48">
                            {occupancyData.map(({ month, value }) => (
                                <div key={month} className="flex flex-col items-center flex-1 gap-2">
                                    <div className="flex items-end justify-center h-40 w-full">
                                        <div
                                            className="w-5 bg-indigo-600 rounded-t hover:bg-indigo-700 transition-all"
                                            style={{ height: `${(value / maxValue) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-500">{month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Customer Feedback
                    </h2>

                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {feedbackData.map(({ name, comment, room }) => (
                        <div key={room} className="pb-4 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-800">{name}</span>
                                <span className="text-sm text-gray-500">{room}</span>
                            </div>
                            <p className="text-sm text-gray-600">{comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OccupancyAndFeedback;
