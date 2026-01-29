
import { MoreVertical } from 'lucide-react';


function RoomType(){
  const rooms = [
    {
      dealCount: 2,
      name: "Single sharing",
      occupied: 2,
      total: 30,
      price: 568
    },
    {
      dealCount: 2,
      name: "Double sharing",
      occupied: 2,
      total: 35,
      price: 1068
    },
    {
      dealCount: null,
      name: "Triple sharing",
      occupied: 2,
      total: 25,
      price: 1568
    },
    {
      dealCount: null,
      name: "VIP Suit",
      occupied: 4,
      total: 10,
      price: 2568
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Rooms</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
          >
            {/* Deal Badge */}
            {room.dealCount && (
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded">
                  {room.dealCount} Deals
                </span>
              </div>
            )}
            
            {/* Menu Button */}
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </button>
            
            {/* Room Info */}
            <div className="mt-8">
              <h3 className="text-gray-700 font-medium mb-2">{room.name}</h3>
              
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-gray-800">{room.occupied}</span>
                <span className="text-gray-400 text-lg">/{room.total}</span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-indigo-600 text-xl font-bold">
                  $ {room.price.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomType;
