import { useState } from "react";
import StepIndicator from "./StepIndicator";
import ConfirmationScreen from "./ConfirmationScreen";
import GuestInfoStep from "./steps/GuestInfoStep";
import StayDetailsStep from "./steps/StayDetailsStep";
import RoomDetailsStep from "./steps/RoomDetailsStep";

const STEPS = [
  { number: 1, label: "Guest Info" },
  { number: 2, label: "Stay Details" },
  { number: 3, label: "Room & Location" },
];

const EMPTY_FORM = {
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
};

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

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
    setFormData(EMPTY_FORM);
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const diff = new Date(formData.checkOutDate) - new Date(formData.checkInDate);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Step tracker */}
        {!isConfirmed && (
          <div className="mb-8 rounded-2xl bg-white px-8 py-5 shadow-sm">
            <div className="flex items-center">
              {STEPS.map((step, index) => (
                <>
                  <div key={step.number} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        currentStep >= step.number
                          ? "bg-[#9dc43b] text-white shadow-sm shadow-[#9dc43b]/40"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {currentStep > step.number ? "✓" : step.number}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors duration-300 ${
                        currentStep >= step.number ? "text-[#9dc43b]" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      key={`line-${index}`}
                      className={`mb-5 h-px flex-1 transition-colors duration-500 ${
                        currentStep > step.number ? "bg-[#9dc43b]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        )}

        {/* Form card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          {/* Step label */}
          {!isConfirmed && (
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e7f68f] text-sm font-bold text-gray-700">
                {currentStep}
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  Step {currentStep} of 3
                </p>
                <h2 className="text-base font-bold text-gray-900">{STEPS[currentStep - 1].label}</h2>
              </div>
            </div>
          )}

          {isConfirmed ? (
            <ConfirmationScreen formData={formData} calculateNights={calculateNights} onNewBooking={handleNewBooking} />
          ) : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && <GuestInfoStep formData={formData} onChange={handleChange} onNext={handleNext} />}
              {currentStep === 2 && (
                <StayDetailsStep formData={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {currentStep === 3 && <RoomDetailsStep formData={formData} onChange={handleChange} onBack={handleBack} />}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
