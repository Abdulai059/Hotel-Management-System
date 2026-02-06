export default function PrintableInvoice({ bookingData }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Screen View - Your existing component */}
      <div className="screen-only">
        {/* Your existing booking details component goes here */}
        <div className="mx-auto max-w-4xl p-4">
          <button
            onClick={handlePrint}
            className="mb-4 rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            Print Invoice
          </button>
          {/* Rest of your existing UI */}
        </div>
      </div>

      {/* Print View - Different Style */}
      <div className="print-only">
        <div className="invoice-container">
          {/* Header */}
          <div className="invoice-header">
            <div className="hotel-info">
              <h1>{bookingData.hotel?.name || "hotel homes"}</h1>
              <p>{bookingData.hotel?.address || "Ghana"}</p>
              <div className="contact-details">
                <div>
                  <strong>Phone:</strong> {bookingData.hotel?.phone || ""}
                </div>
                <div>
                  <strong>Email:</strong> {bookingData.hotel?.email || "abdulaioman8080@gmail.com"}
                </div>
                <div>
                  <strong>Website:</strong> {bookingData.hotel?.website || ""}
                </div>
              </div>
            </div>

            <div className="invoice-title">
              <h2>Proforma Invoice(Estimate)</h2>
              <div className="invoice-meta">
                <span>
                  Check-in: {bookingData.stay?.checkInDate} {bookingData.stay?.checkInDay},{" "}
                  {bookingData.stay?.checkInMonth}
                </span>
                <span>
                  Check-out: {bookingData.stay?.checkOutDate} {bookingData.stay?.checkOutDay},{" "}
                  {bookingData.stay?.checkOutMonth}
                </span>
                <span>ID#G {bookingData.idG || "02058"}</span>
                <span>Res ID: {bookingData.reservationId || "020515"}</span>
              </div>
            </div>
          </div>

          {/* Folio Title */}
          <h2 className="folio-title">Folio #{bookingData.folio || "PI 36"}</h2>

          {/* Guest Details */}
          <div className="guest-section">
            <h3>Guest Details</h3>
            <div className="guest-grid">
              <div className="guest-col">
                <div className="detail-row">
                  <strong>Guest Name:</strong>
                  <span className="guest-name">{bookingData.guestName || "Alice Swift"}</span>
                  <span>({bookingData.guestId || "P7"})</span>
                </div>
                <div className="detail-row">
                  <strong>Address:</strong>
                  <span>{bookingData.address || ""}</span>
                </div>
                <div className="detail-row">
                  <strong>Phone:</strong>
                  <span>{bookingData.phone || "556655"}</span>
                </div>
                <div className="detail-row">
                  <strong>Email:</strong>
                  <span>{bookingData.email || "guestmail@hotelgix.co"}</span>
                </div>
              </div>
              <div className="guest-col">
                <div className="detail-row">
                  <strong>:</strong>
                  <span>{bookingData.createdOn || "Feb 05, 2026"}</span>
                </div>
                <div className="detail-row">
                  <strong>:</strong>
                  <div>
                    <div>{bookingData.stay?.type || "Superior Room(SUP-131)"}</div>
                    <div>
                      {bookingData.stay?.checkInDate}-{bookingData.stay?.checkOutDate}({bookingData.stay?.nights}{" "}
                      Nights)
                    </div>
                    <div className="rate-type">{bookingData.stay?.rateType || "Seasonal Rate"}</div>
                  </div>
                </div>
                <div className="detail-row">
                  <strong>:</strong>
                  <span>{bookingData.stay?.rooms || "1 Room(s)/2 (2 Adults)"}</span>
                </div>
                <div className="detail-row">
                  <strong>Amount:</strong>
                  <div>
                    <strong className="amount-value">$ {bookingData.amount?.toFixed(2) || "200.00"}</strong>
                    <div className="amount-subtext">
                      ($ {bookingData.totalWithTax?.toFixed(2) || "230.00"} with tax ${" "}
                      {bookingData.tax?.toFixed(2) || "30.00"})
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description-References</th>
                <th>Disc/Allw</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.transactions?.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    {index + 1} {transaction.date}
                  </td>
                  <td className="description">{transaction.description}</td>
                  <td className="center">{transaction.discAllw || "-"}</td>
                  <td className="amount">{transaction.amount ? `$ ${transaction.amount.toFixed(2)}` : ""}</td>
                  <td className="amount">{transaction.tax ? `$ ${transaction.tax.toFixed(2)}` : ""}</td>
                  <td className="amount">{transaction.payment ? `$ ${transaction.payment.toFixed(2)}` : ""}</td>
                </tr>
              )) || (
                <tr>
                  <td>1 Feb 05, 2026</td>
                  <td className="description">Seasonal Rate Room Rent Superior Room/SUP-131</td>
                  <td className="center">-</td>
                  <td className="amount">$ 200.00</td>
                  <td className="amount">$ 30.00</td>
                  <td className="amount"></td>
                </tr>
              )}
              <tr className="total-row">
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td className="center">-</td>
                <td className="amount">
                  <strong>$ {bookingData.summary?.totalCharges?.toFixed(2) || "200.00"}</strong>
                </td>
                <td className="amount">
                  <strong>$ {bookingData.summary?.totalTax?.toFixed(2) || "30.00"}</strong>
                </td>
                <td className="amount">
                  <strong>$ {bookingData.summary?.totalPayment?.toFixed(2) || "0.00"}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Summary */}
          <div className="summary-section">
            <div className="summary-row">
              <span>
                <strong>Total</strong>
              </span>
              <span>
                <strong>$ {bookingData.summary?.total?.toFixed(2) || "200.00"}</strong>
              </span>
            </div>
            <div className="summary-row">
              <span>Occupancy Tax</span>
              <span>$ {bookingData.summary?.occupancyTax?.toFixed(2) || "30.00"}</span>
            </div>
            <div className="summary-row">
              <span>VAT</span>
              <span>$ {bookingData.summary?.vat?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="summary-row total">
              <span>
                <strong>Total Amount</strong>
              </span>
              <span>
                <strong>$ {bookingData.summary?.totalAmount?.toFixed(2) || "230.00"}</strong>
              </span>
            </div>
            <div className="summary-row">
              <span>Includes Disc/Allw</span>
              <span>$ {bookingData.summary?.includesDiscAllw?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="summary-row">
              <span>Total Paid</span>
              <span>$ {bookingData.summary?.totalPaid?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="summary-row balance">
              <span>
                <strong>Balance</strong>
              </span>
              <span>
                <strong>$ {bookingData.summary?.balance?.toFixed(2) || "230.00"}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        .screen-only {
          display: block;
        }

        .print-only {
          display: none;
        }

        @media print {
          .screen-only {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          @page {
            margin: 0.5in;
            size: A4;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .invoice-container {
            max-width: 100%;
            padding: 20px;
            border: 3px solid #666;
            font-family: Arial, sans-serif;
          }

          .invoice-header {
            border: 2px solid #666;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
          }

          .hotel-info {
            text-align: center;
            margin-bottom: 20px;
          }

          .hotel-info h1 {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .hotel-info p {
            margin: 5px 0;
            font-size: 12px;
          }

          .contact-details {
            margin-top: 10px;
            font-size: 11px;
          }

          .contact-details div {
            margin: 3px 0;
          }

          .invoice-title {
            border-top: 2px solid #ccc;
            padding-top: 15px;
            text-align: center;
          }

          .invoice-title h2 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .invoice-meta {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            flex-wrap: wrap;
            gap: 10px;
          }

          .folio-title {
            font-size: 28px;
            font-weight: bold;
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #ccc;
          }

          .guest-section {
            margin-bottom: 30px;
          }

          .guest-section h3 {
            font-size: 16px;
            color: #1e40af;
            margin-bottom: 15px;
          }

          .guest-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            font-size: 12px;
          }

          .detail-row {
            margin-bottom: 10px;
            display: flex;
            gap: 8px;
          }

          .guest-name {
            color: #2563eb;
            font-weight: 600;
          }

          .rate-type {
            color: #2563eb;
            margin-top: 2px;
          }

          .amount-value {
            font-size: 14px;
          }

          .amount-subtext {
            font-size: 10px;
            color: #666;
            margin-top: 2px;
          }

          .transactions-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            font-size: 11px;
          }

          .transactions-table th {
            background-color: #f3f4f6;
            border: 1px solid #666;
            padding: 8px;
            text-align: left;
            font-weight: 600;
          }

          .transactions-table td {
            border: 1px solid #ccc;
            padding: 8px;
          }

          .transactions-table .description {
            color: #2563eb;
          }

          .transactions-table .center {
            text-align: center;
          }

          .transactions-table .amount {
            text-align: right;
          }

          .transactions-table .total-row {
            background-color: #f3f4f6;
            border-top: 2px solid #666;
          }

          .summary-section {
            margin-left: auto;
            width: 300px;
            font-size: 12px;
          }

          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #ccc;
          }

          .summary-row.total {
            border-top: 2px solid #666;
            border-bottom: 2px solid #666;
            font-size: 13px;
          }

          .summary-row.balance {
            border-top: 2px solid #666;
            font-size: 14px;
            font-weight: bold;
            padding-top: 12px;
          }
        }
      `}</style>
    </>
  );
}
