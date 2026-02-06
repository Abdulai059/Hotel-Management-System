import { useState } from "react";
import BookingHeader from "../features/FrontDesk/GuestDetals/BookingHeader";
import GuestDetails from "../features/FrontDesk/GuestDetals/GuestDetails";
import StayDetails from "../features/FrontDesk/GuestDetals/StayDetails";
import RoomSharers from "../features/FrontDesk/GuestDetals/RoomSharer";
import DepartureForm from "../features/FrontDesk/GuestDetals/DepartureForm";
import RatesPackages from "../features/FrontDesk/GuestDetals/RatesPackages";
import ActionButtons from "../features/FrontDesk/GuestDetals/ActionButtons";
import PaymentCard from "../features/FrontDesk/GuestDetals/PaymentCard";

const initialBookingData = {
  guest: {
    name: "Anastasia Hue",
    pId: "P18",
    address: "12 Elm Street",
    city: "Accra",
    state: "Greater Accra",
    country: "Ghana",
    zipCode: "GA100",
    gender: "Female",
    dob: "1995-06-15",
    nationality: "Ghanaian",
    email: "guestmail@hotelogix.co",
    phone: "0556655000",
  },
  room: {
    type: "Superior Room",
    number: "Not Assigned",
    status: "Reserved",
    resId: "020528",
  },
  stay: {
    checkInDate: "Thu",
    checkInDay: "05",
    checkInMonth: "Feb 2026",
    checkOutDate: "Sun",
    checkOutDay: "08",
    checkOutMonth: "Feb 2026",
    nights: 3,
    guests: 0,
    purpose: "",
    source: "",
    type: "",
    mktSgmt: "",
    salesPerson: "",
  },
  payment: {
    roomTariff: 1200.0,
    roomTax: 90.0,
    addOns: 0.0,
    otherCharges: 0.0,
    otherTax: 0.0,
    amountPaid: 1290.0,
    discount: 0.0,
    otherDiscount: 0.0,
  },
};

export default function BookingDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [bookingData, setBookingData] = useState(initialBookingData);

  const handleInputChange = (section, field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const getStatusColor = (status) => {
    const colors = { "Checked In": "bg-green-600", Reserved: "bg-blue-600", "Checked Out": "bg-red-600" };
    return colors[status] || "bg-blue-600";
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <BookingHeader
        bookingData={bookingData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleInputChange={handleInputChange}
      />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-4 lg:basis-3/5">
          <GuestDetails bookingData={bookingData} isEditing={isEditing} handleInputChange={handleInputChange} />
          <RoomSharers />
        </div>

        <div className="flex flex-col gap-4 lg:basis-1/5">
          <StayDetails
            bookingData={bookingData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            getStatusColor={getStatusColor}
          />
          <DepartureForm />
        </div>

        <div className="flex flex-col gap-4 lg:basis-2/5">
          <PaymentCard bookingData={bookingData} isEditing={isEditing} handleInputChange={handleInputChange} />
          <RatesPackages />
        </div>
      </div>
      <ActionButtons />
    </div>
  );
}
