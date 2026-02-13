function AccountButtons() {
  const primaryActions = ["TAX EXEMPT", "ROUTE TO NEW FOLIO", "RETURNS", "ROUTE PAYMENT"];
  const secondaryActions = ["Generate Folio", "Other Charges", "Custom Charge / Allowance", "Guest Check-out"];

  return (
    <div className="hidden gap-4 lg:flex lg:flex-1 lg:flex-col">
      <div className="flex flex-wrap gap-2">
        {primaryActions.map((label) => (
          <button
            key={label}
            className="rounded border-2 border-sky-600 px-3 py-1.5 text-xs font-medium text-sky-600 hover:bg-blue-50 sm:px-4 sm:py-2 sm:text-sm"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {secondaryActions.map((label) => (
          <button
            key={label}
            className="rounded border border-gray-400 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccountButtons;
