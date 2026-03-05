import { useState } from "react";
import { X, Bed, Star } from "lucide-react";
import { useAvailableRooms } from "@/services/apirooms";
import { useAssignRoom } from "@/services/apiassignRoom";

export default function AssignRoomModal({ isOpen, onClose, booking, onAssignRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { rooms, loading } = useAvailableRooms();
  const { assign, assigning } = useAssignRoom({ booking, onAssignRoom, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <ModalHeader booking={booking} onClose={onClose} />

        <div className="p-6">
          {loading ? (
            <LoadingState />
          ) : rooms.length === 0 ? (
            <EmptyState />
          ) : (
            <RoomGrid rooms={rooms} selectedRoom={selectedRoom} onSelect={setSelectedRoom} />
          )}
        </div>

        <ModalFooter
          selectedRoom={selectedRoom}
          assigning={assigning}
          onClose={onClose}
          onAssign={() => selectedRoom && assign(selectedRoom)}
        />
      </div>
    </div>
  );
}

function ModalHeader({ booking, onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Assign Room</h2>
        <p className="text-sm text-gray-500">
          {booking?.guests?.full_name} • {booking?.guests?.phone}
        </p>
      </div>
      <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
        <X size={20} />
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#9dc43b]" />
        <p className="mt-2 text-sm text-gray-500">Loading available rooms...</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <Bed className="mx-auto h-12 w-12 text-gray-300" />
        <p className="mt-2 text-sm text-gray-500">No available rooms found</p>
      </div>
    </div>
  );
}

function RoomGrid({ rooms, selectedRoom, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} isSelected={selectedRoom?.id === room.id} onSelect={onSelect} />
      ))}
    </div>
  );
}

function RoomCard({ room, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(room)}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
        isSelected ? "border-[#9dc43b] bg-[#d5f6e5]" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{room.room_name || "Room Name"}</h3>
          <p className="text-sm text-gray-500">Room {room.room_number}</p>
        </div>
        <div className="rounded-full bg-[#e7f68f] px-2 py-1 text-xs font-semibold text-gray-700">Available</div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Star size={14} />
        {room.room_types?.name || "Standard"}
      </div>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <p className="text-lg font-bold text-gray-900">
          GH₵ {room.room_types?.base_price || 0}
          <span className="text-xs font-normal text-gray-400">/night</span>
        </p>
      </div>

      {isSelected && (
        <div className="mt-3 flex items-center justify-center">
          <div className="rounded-full bg-[#9dc43b] p-1">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}

function ModalFooter({ selectedRoom, assigning, onClose, onAssign }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
      <div className="text-sm text-gray-500">
        {selectedRoom && (
          <span>
            Selected: Room {selectedRoom.room_number} — {selectedRoom.room_name}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onAssign()}
          disabled={!selectedRoom || assigning}
          className="rounded-lg bg-[#9dc43b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8ab235] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {assigning ? "Assigning..." : "Assign Room & Check In"}
        </button>
      </div>
    </div>
  );
}
