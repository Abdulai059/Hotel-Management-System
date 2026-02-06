import React, { useState } from "react";

export default function AccountStatement() {
  const [selectedRows, setSelectedRows] = useState([]);

  const transactions = [
    {
      id: 1,
      date: "Feb 02, 2026",
      description: "Seasonal Rate Room Rent Superior Room/SUP-137",
      folio: "PI 33",
      discAllwnce: "-",
      charges: 200.0,
      tax: 30.0,
      payment: null,
      isPayment: false,
    },
    {
      id: 2,
      date: "Feb 03, 2026",
      description: "Paid by Shawn Monett with Cash",
      folio: "",
      discAllwnce: "",
      charges: null,
      tax: null,
      payment: 42.0,
      isPayment: true,
    },
    {
      id: 3,
      date: "Feb 03, 2026",
      description: "Seasonal Rate Room Rent Superior Room/SUP-137",
      folio: "PI 33",
      discAllwnce: "-",
      charges: 200.0,
      tax: 30.0,
      payment: null,
      isPayment: false,
    },
    {
      id: 4,
      date: "Feb 04, 2026",
      description: "Paid by Shawn Monett with Cash",
      folio: "",
      discAllwnce: "",
      charges: null,
      tax: null,
      payment: 316.0,
      isPayment: true,
    },
    {
      id: 5,
      date: "Feb 04, 2026",
      description: "Seasonal Rate Room Rent Superior Room/SUP-137",
      folio: "PI 33",
      discAllwnce: "-",
      charges: 200.0,
      tax: 30.0,
      payment: null,
      isPayment: false,
    },
    {
      id: 6,
      date: "Feb 05, 2026",
      description: "Seasonal Rate Room Rent Superior Room/SUP-137",
      folio: "PI 33",
      discAllwnce: "-",
      charges: 200.0,
      tax: 30.0,
      payment: null,
      isPayment: false,
    },
  ];

  const summary = {
    totalCharges: 800.0,
    totalTax: 120.0,
    totalPayment: 358.0,
    bookingTotal: 800.0,
    otherCharges: 0.0,
    totalTaxSummary: 120.0,
    totalDiscAllw: 0.0,
    totalAmount: 920.0,
    totalPaid: 358.0,
    balance: 562.0,
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(transactions.map((t) => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6">
      <h2 className="mb-6 text-lg font-bold text-blue-900 uppercase">Account Statement</h2>

      {/* Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-2 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === transactions.length}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Description - References</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Folio #</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Disc/Allwnce</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Charges</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Tax</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-800">Payment</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={`border-b border-gray-200 ${transaction.isPayment ? "bg-yellow-100" : ""}`}
              >
                <td className="px-2 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(transaction.id)}
                    onChange={() => handleSelectRow(transaction.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-gray-700">{transaction.date}</td>
                <td className="px-4 py-3">
                  {transaction.folio ? (
                    <span className="cursor-pointer text-blue-600 hover:underline">{transaction.description}</span>
                  ) : (
                    <span className="text-gray-700">{transaction.description}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {transaction.folio && (
                    <span className="cursor-pointer text-blue-600 hover:underline">{transaction.folio}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{transaction.discAllwnce}</td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {transaction.charges ? `$ ${transaction.charges.toFixed(2)}` : ""}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {transaction.tax ? `$ ${transaction.tax.toFixed(2)}` : ""}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {transaction.payment ? `$ ${transaction.payment.toFixed(2)}` : ""}
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="border-t-2 border-gray-400 bg-gray-50 font-semibold">
              <td colSpan="3" className="px-4 py-3 text-gray-800">
                Total
              </td>
              <td className="px-4 py-3 text-gray-700">-</td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalCharges.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalTax.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-gray-800">$ {summary.totalPayment.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-6">
        {/* LEFT: Actions */}
        <div className="flex-1">
          <div className="mb-6 flex flex-wrap gap-3">
            <button className="rounded border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
              TAX EXEMPT
            </button>
            <button className="rounded border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
              ROUTE CHARGES
            </button>
            <button className="rounded border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
              ROUTE TO NEW FOLIO
            </button>
            <button className="rounded border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
              RETURNS
            </button>
            <button className="rounded border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
              ROUTE PAYMENT
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Generate Folio
            </button>
            <button className="rounded border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Consolidate Account
            </button>
            <button className="rounded border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Other Charges
            </button>
            <button className="rounded border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Custom Charge / Allowance
            </button>
            <button className="rounded border border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Guest Check-out
            </button>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="w-80 shrink-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-700">Booking Total</span>
              <span className="font-medium">$ {summary.bookingTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-700">Other Charges</span>
              <span className="font-medium">$ {summary.otherCharges.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-700">Total Tax</span>
              <span className="font-medium">$ {summary.totalTaxSummary.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-700">Total Disc/Allw</span>
              <span className="font-medium">$ {summary.totalDiscAllw.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-gray-300 py-2 font-semibold">
              <span>Total Amount</span>
              <span>$ {summary.totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-700">Total Paid</span>
              <span className="font-medium">$ {summary.totalPaid.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t border-gray-300 py-2 text-base font-bold">
              <span>Balance</span>
              <span>$ {summary.balance.toFixed(2)}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button className="text-sm font-medium text-blue-600 hover:underline">Currency Converter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
