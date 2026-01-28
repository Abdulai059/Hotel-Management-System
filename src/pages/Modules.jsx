import { Building2, MapPin, Shield } from "lucide-react";

export default function Modules() {
    const user = {
        name: 'Abdulai Zesung Uosumanu',
        role: 'Front Desk',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
        hotel: {
            name: 'Global Dream Hotel',
            location: 'Downtown, New York',
            id: 'hotel_001'
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const modules = [
        {
            title: 'Front Desk Module',
            description: 'Handles all front desk operations including guest management and room assignments.',
            color: 'green',
        },
        {
            title: 'Restaurant Module',
            description: 'Manages restaurant orders, menus, and dining services for guests.',
            color: 'red',
        },
        {
            title: 'Purchase Module',
            description: 'Tracks hotel purchases, supplier orders, and inventory management.',
            color: 'yellow',
        },
    ];

    const colorStyles = {
        green: { bg: 'bg-green-100', border: 'border-green-500', title: 'text-green-700', text: 'text-green-800' },
        red: { bg: 'bg-red-100', border: 'border-red-500', title: 'text-red-700', text: 'text-red-800' },
        yellow: { bg: 'bg-yellow-100', border: 'border-yellow-500', title: 'text-yellow-700', text: 'text-yellow-800' },
    };

    return (
        <div className="max-w-375 mx-auto mt-20 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-20">

                <div className="rounded-sm p-8 shadow-md">
                    <div className="flex flex-col lg:flex-row w-full items-center lg:items-start gap-6 mb-6">

                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-700 shadow-lg shadow-blue-500/30">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                                <Shield size={16} className="text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-start gap-4 flex-1">
                            <div className="text-center lg:text-left">
                                <p className="text-gray-900 text-sm font-medium">{getGreeting()},</p>
                                <h1 className="text-gray-900 text-4xl font-bold">{user.name}!</h1>
                                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 mt-2">
                                    <Shield size={14} className="text-indigo-500" />
                                    <span className="text-indigo-500 text-sm font-semibold">{user.role}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-4 w-full">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-md">
                                    <img src="/global-dreams.png" alt="logo" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-500 text-xs font-medium mb-0.5">Currently Managing</p>
                                    <h3 className="text-gray-900 text-base font-bold">{user.hotel.name}</h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                <MapPin size={14} />
                                <span>{user.hotel.location}</span>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col text-right">
                            <p className="text-gray-900 text-sm mb-1">Today's Date</p>
                            <p className="text-gray-900 text-lg font-semibold">
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-900 border border-gray-800 rounded-lg p-4">
                        <p className="text-white text-center text-sm">
                            Welcome to your dashboard! You have access to all {user.role} modules below.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    {modules.map((module) => {
                        const style = colorStyles[module.color] || colorStyles.green;
                        return (
                            <div
                                key={module.title}
                                className={`flex-1 min-w-63 ${style.bg} border-l-4 ${style.border} rounded-lg shadow p-6 hover:scale-105 transition-transform`}
                            >
                                <h2 className={`text-2xl font-bold mb-2 ${style.title}`}>{module.title}</h2>
                                <p className={`${style.text}`}>{module.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
