import React from "react";

export default function StepIndicator({
  stepNumber,
  label,
  isActive,
  activeBgColor = "bg-red-600",
  activeTextColor = "text-white",
  inactiveBgColor = "bg-gray-300",
  inactiveTextColor = "text-gray-600",
  labelActiveColor = "text-red-600",
  labelInactiveColor = "text-gray-500",
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold transition-colors ${
          isActive ? `${activeBgColor} ${activeTextColor}` : `${inactiveBgColor} ${inactiveTextColor}`
        }`}
      >
        {stepNumber}
      </div>
      <span className={`text-sm ${isActive ? labelActiveColor : labelInactiveColor}`}>{label}</span>
    </div>
  );
}
