function AccountButtons() {
  const primaryActions = ["TAX EXEMPT", "ROUTE TO NEW FOLIO", "RETURNS", "ROUTE PAYMENT"];
  const secondaryActions = ["Generate Folio", "Other Charges", "Custom Charge / Allowance", "Guest Check-out"];

  return (
    <div className="hidden gap-4 lg:flex lg:flex-1 lg:flex-col">
      <div className="flex flex-wrap gap-2">
        {primaryActions.map((label) => (
          <button
            key={label}
            className="rounded-xl bg-[#9dc43b] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#8ab534]"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {secondaryActions.map((label) => (
          <button
            key={label}
            className="rounded-xl border border-[#9dc43b] px-4 py-2 text-xs font-semibold text-[#9dc43b] transition-colors hover:bg-[#e7f68f]"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccountButtons;
