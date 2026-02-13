function PaymentButtons() {
  return (
    <div className="mt-6 flex gap-3">
      <button className="rounded border border-gray-300 bg-amber-500 px-4 py-1 text-sm font-medium text-white">
        Email
      </button>
      <button className="rounded border border-gray-300 bg-rose-500 px-4 py-1 text-sm font-medium text-white">
        Lock
      </button>
      <button className="rounded border border-gray-300 bg-green-500 px-4 py-1 text-sm font-medium text-white">
        Print
      </button>
    </div>
  );
}

export default PaymentButtons;
