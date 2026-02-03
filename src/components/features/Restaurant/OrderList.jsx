import { ArrowUpDown, MoreHorizontal } from "lucide-react";

function SortableHeader({ label }) {
  return (
    <span className="inline-flex cursor-pointer items-center gap-1 select-none">
      {label}
      <ArrowUpDown className="h-4 w-4 text-gray-400" />
    </span>
  );
}

function OrderList() {
  const orders = [
    {
      no: 1,
      id: "#12345",
      date: "Jan 24th, 2020",
      customerName: "Roberto Carlo",
      room: "A002",
      amount: "$34.20",
      status: "New Order",
      statusColor: "gray",
    },
    {
      no: 2,
      id: "#12366",
      date: "Jan 22th, 2020",
      customerName: "Rohmad Khoir",
      room: "B022",
      amount: "$44.25",
      status: "On Delivery",
      statusColor: "indigo",
    },
  ];

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Order List</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
              Monthly
            </button>
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              Weekly
            </button>
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
              Today
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">No</th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                <SortableHeader label="ID" />
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                <SortableHeader label="Customer Name" />
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Room</th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                <SortableHeader label="Amount" />
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                <SortableHeader label="Status Order" />
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.no} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{order.no}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.room}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                      order.statusColor === "indigo" ? "bg-indigo-50 text-indigo-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        order.statusColor === "indigo" ? "bg-indigo-700" : "bg-gray-700"
                      }`}
                    ></span>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 transition hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
