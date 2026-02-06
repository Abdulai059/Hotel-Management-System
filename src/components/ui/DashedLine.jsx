import React from "react";

export default function DashedLine() {
  return (
    <div className="flex items-center justify-center bg-white p-2">
      <div className="flex items-center gap-1">
        <div className="h-1 w-5 rounded-full bg-gray-300" />

        <div className="flex gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-0.75 w-2 rounded-full bg-gray-300" />
          ))}
        </div>

        <div className="h-1 w-5 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
