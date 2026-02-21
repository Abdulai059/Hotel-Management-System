import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  CreditCard,
  Percent,
  Landmark,
  Search,
  Plus,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import { useCorporateBookings } from "./useCorporateBookings";

function DiscountBadge({ rate }) {
  if (rate == null) return <span className="text-sm text-gray-400">—</span>;
  return (
    <span className="bg-btn-green inline-block rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700">
      {rate}%
    </span>
  );
}

function MobileCard({ booking }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{booking.company_name}</p>
          <p className="mt-0.5 text-xs text-gray-500">{booking.contact_person ?? "—"}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {booking.group_code && (
            <span className="bg-foregroundyellow rounded-lg px-2 py-0.5 text-xs font-bold text-gray-700">
              {booking.group_code}
            </span>
          )}
          <button className="text-gray-300 hover:text-gray-500">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
      <div className="space-y-2 border-t border-gray-50 pt-3 text-sm">
        {booking.contact_email && (
          <div className="flex items-center gap-2 text-blue-500">
            <Mail size={13} className="shrink-0" />
            <span className="truncate">{booking.contact_email}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-400">Discount</span>
          <DiscountBadge rate={booking.discountRate} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

export default function CorporateBookings() {
  const [search, setSearch] = useState("");
  const { data: bookings = [], isLoading, error } = useCorporateBookings();

  const filtered = bookings.filter(
    (booking) =>
      booking.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      booking.contact_person?.toLowerCase().includes(search.toLowerCase()) ||
      booking.group_code?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-sm bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Landmark className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Corporate Accounts</h1>
              <p className="text-xs text-gray-400">Organizations responsible for bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search company, contact, code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm placeholder:text-gray-400 focus:border-[#9dc43b] focus:bg-white focus:outline-none sm:w-64"
              />
            </div>
            <button className="bg-btn-green flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-[#d4e87a]">
              <Plus size={15} />
              <span className="hidden sm:inline">Add Account</span>
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl bg-red-50 p-5 text-center text-sm text-red-500">
            Failed to load corporate accounts.
          </div>
        )}

        {/* Desktop table */}
        {!isLoading && !error && (
          <>
            <div className="hidden overflow-hidden rounded-sm bg-white shadow-sm lg:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {[
                        { icon: CreditCard, label: "Group Code" },
                        { icon: Building2, label: "Company" },
                        { icon: User, label: "Contact" },
                        { icon: Mail, label: "Email" },
                        { icon: Percent, label: "Discount" },
                      ].map(({ icon: Icon, label }) => (
                        <th key={label} className="px-4 py-3 text-left">
                          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                            <Icon size={13} />
                            {label}
                          </div>
                        </th>
                      ))}
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <EmptyState message="No accounts found." />
                        </td>
                      </tr>
                    ) : (
                      filtered.map((booking, idx) => (
                        <tr
                          key={booking.id}
                          className={`border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/60 ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="px-4 py-3">
                            {booking.group_code ? (
                              <span className="rounded-sm px-2.5 py-1 text-xs font-medium text-gray-700">
                                {booking.group_code}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.company_name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{booking.contact_person ?? "—"}</td>
                          <td className="px-4 py-3 text-sm text-blue-500">{booking.contact_email ?? "—"}</td>
                          <td className="px-4 py-3">
                            <DiscountBadge rate={booking.discountRate} />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-gray-300 transition-colors hover:text-gray-500">
                              <MoreHorizontal size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
              {filtered.length === 0 ? (
                <EmptyState message="No accounts found." />
              ) : (
                filtered.map((booking) => <MobileCard key={booking.id} booking={booking} />)
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
