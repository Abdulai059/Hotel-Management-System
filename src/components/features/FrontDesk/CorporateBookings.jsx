import { useState } from "react";
import { Building2, User, Phone, Mail, CreditCard, Percent, Calendar, Landmark } from "lucide-react";

export default function CorporateBookings() {
  const [bookings] = useState([
    {
      id: 1,
      companyName: "Volta River Authority (VRA)",
      contactPerson: "Kwame Mensah",
      contactPhone: "+233 24 123 4567",
      contactEmail: "kwame.mensah@vra.com.gh",
      billingType: "Invoice",
      discountRate: "15%",
      paymentTerms: "Net 30",
    },
    {
      id: 2,
      companyName: "Social Security & National Insurance Trust (SSNIT)",
      contactPerson: "Akosua Boateng",
      contactPhone: "+233 20 234 5678",
      contactEmail: "a.boateng@ssnit.org.gh",
      billingType: "Invoice",
      discountRate: "10%",
      paymentTerms: "Net 60",
    },
    {
      id: 3,
      companyName: "Electricity Company of Ghana (ECG)",
      contactPerson: "Yaw Owusu",
      contactPhone: "+233 27 345 6789",
      contactEmail: "yaw.owusu@ecg.com.gh",
      billingType: "Prepaid",
      discountRate: "5%",
      paymentTerms: "Net 30",
    },
    {
      id: 5,
      companyName: "Ghana National Petroleum Corporation (GNPC)",
      contactPerson: "Kojo Asante",
      contactPhone: "+233 25 567 8901",
      contactEmail: "kojo.asante@gnpcghana.com",
      billingType: "Invoice",
      discountRate: "18%",
      paymentTerms: "Net 60",
    },
  ]);

  return (
    <section className="bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-sm bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-slate-600" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Corporate Booking Accounts</h1>
              <p className="text-sm text-slate-500">Organization responsible for the booking</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Company
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Contact
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Billing
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Discount
                    </div>
                  </th>

                  <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Terms
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="transition hover:bg-slate-50">
                    <td className="border border-slate-200 px-4 py-2 text-sm text-slate-800">{b.companyName}</td>
                    <td className="border border-slate-200 px-4 py-2 text-sm text-slate-700">{b.contactPerson}</td>
                    <td className="border border-slate-200 px-4 py-2 text-sm text-slate-600">{b.contactPhone}</td>
                    <td className="border border-slate-200 px-4 py-2 text-sm text-blue-600">{b.contactEmail}</td>
                    <td className="border border-slate-200 px-4 py-2 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          b.billingType === "Invoice"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {b.billingType}
                      </span>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        {b.discountRate}
                      </span>
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-sm text-slate-700">{b.paymentTerms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="border-t border-yellow-200 bg-yellow-50 px-6 py-4">
            <p className="text-sm font-medium text-yellow-800">
              Corporate details are required before completing the booking.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
