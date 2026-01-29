import React from "react";

export default function Button({
    label,
    onClick,
    icon,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
}) {
    const baseStyles =
        "rounded-full active:scale-95 transition flex items-center justify-center gap-1 font-medium";

    const sizeClasses = {
        sm: "w-32 py-2 text-xs",
        md: "w-40 py-2 text-sm", // default py-3
        lg: "w-48 py-4 text-base",
    };

    const variants = {
        primary: "bg-indigo-600 text-white",
        secondary: "bg-white text-gray-500 border border-gray-300",
        slate: "bg-gray-700 text-white",
        ghost: "bg-gray-100 text-gray-700 border border-gray-300 hover:text-white hover:bg-indigo-600",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${sizeClasses[size]} ${variants[variant]} ${className}`}
        >
            {icon}
            <p className="mb-0.5">{label}</p>
        </button>
    );
}
