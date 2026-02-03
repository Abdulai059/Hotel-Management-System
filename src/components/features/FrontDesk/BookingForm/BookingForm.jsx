import { useState } from "react";
import StepIndicator from "./StepIndicator";
import GuestInfoStep from "./steps/GuestInfoStep";
import StayDetailsStep from "./steps/StayDetailsStep";
import RoomLocationStep from "./steps/RoomLocationStep";
import ConfirmationScreen from "./ConfirmationScreen";

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
    numberOfRooms: "4",
    numberOfAdults: "1",
    numberOfChildren: "2",
    country: "",
    city: "",
    town: "",
    residentialAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };
  const handleNewBooking = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
    setFormData({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
      numberOfRooms: "4",
      numberOfAdults: "1",
      numberOfChildren: "2",
      country: "",
      city: "",
      town: "",
      residentialAddress: "",
    });
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const diff = new Date(formData.checkOutDate) - new Date(formData.checkInDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-900">Reserve Your Stay</h1>
          <p className="text-lg text-gray-600">Find and book your perfect hotel with ease</p>
        </div>

        {!isConfirmed && (
          <div className="mb-12 flex items-center justify-center gap-4 px-20">
            <StepIndicator
              stepNumber={1}
              label="Guest Info"
              isActive={currentStep >= 1}
              activeBgColor="bg-emerald-500"
              activeTextColor="text-white"
              labelActiveColor="text-green-500"
              inactiveBgColor="bg-gray-300"
              inactiveTextColor="text-gray-600"
              labelInactiveColor="text-gray-500"
            />

            <div className="h-px flex-1 bg-gray-300"></div>
            <StepIndicator
              stepNumber={2}
              label="Stay Details"
              isActive={currentStep >= 2}
              activeBgColor="bg-sky-500"
              activeTextColor="text-white"
              labelActiveColor="text-blue-500"
              inactiveBgColor="bg-gray-300"
              inactiveTextColor="text-gray-600"
              labelInactiveColor="text-gray-500"
            />

            <div className="h-px flex-1 bg-gray-300"></div>
            <StepIndicator
              stepNumber={3}
              label="Room & Location"
              isActive={currentStep >= 3}
              activeBgColor="bg-rose-500"
              activeTextColor="text-white"
              labelActiveColor="text-red-500"
              inactiveBgColor="bg-gray-300"
              inactiveTextColor="text-gray-600"
              labelInactiveColor="text-gray-500"
            />
          </div>
        )}

        <div className="rounded-lg p-8">
          {isConfirmed ? (
            <ConfirmationScreen formData={formData} calculateNights={calculateNights} onNewBooking={handleNewBooking} />
          ) : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && <GuestInfoStep formData={formData} onChange={handleChange} onNext={handleNext} />}
              {currentStep === 2 && (
                <StayDetailsStep formData={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {currentStep === 3 && (
                <RoomLocationStep formData={formData} onChange={handleChange} onBack={handleBack} />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
