import { useState } from "react";
import BookingHeader from "../features/FrontDesk/GuestDetals/BookingHeader";
import GuestDetails from "../features/FrontDesk/GuestDetals/GuestDetails";
import StayDetails from "../features/FrontDesk/GuestDetals/StayDetails";
import RoomSharers from "../features/FrontDesk/GuestDetals/RoomSharer";
import DepartureForm from "../features/FrontDesk/GuestDetals/DepartureForm";
import RatesPackages from "../features/FrontDesk/GuestDetals/RatesPackages";
import ActionButtons from "../features/FrontDesk/GuestDetals/ActionButtons";

import { useBooking } from "../features/FrontDesk/useBooking";
import PaymentCard from "../features/FrontDesk/GuestDetals/PaymentCard";

export default function BookingDetails() {
  const { booking, isLoading, error } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Define the handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      "Checked In": "bg-green-600",
      Reserved: "bg-blue-600",
      "Checked Out": "bg-red-600",
    };
    return colors[status] || "bg-blue-600";
  };

  if (isLoading) return <div>Loading booking...</div>;
  if (error) return <div>Error loading booking!</div>;
  if (!booking) return null;

  return (
    <div className="w-full bg-gray-100 p-4">
      <BookingHeader
        booking={booking}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleInputChange={handleInputChange}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-4 lg:basis-3/5">
          <GuestDetails
            booking={booking}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleInputChange={handleInputChange}
          />
          <RoomSharers booking={booking} />
        </div>

        <div className="flex flex-col gap-4 lg:basis-1/5">
          <StayDetails
            booking={booking}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            getStatusColor={getStatusColor}
          />
          <DepartureForm />
        </div>

        <div className="flex flex-col gap-4 lg:basis-2/5">
          <PaymentCard booking={booking} isEditing={isEditing} handleInputChange={handleInputChange} />

          <RatesPackages booking={booking} />
        </div>
      </div>
      <ActionButtons booking={booking} />
    </div>
  );
}
