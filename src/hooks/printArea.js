export function printArea(areaClass) {
  const printContents = document.querySelector(`.${areaClass}`);
  if (!printContents) return;

  const newWin = window.open("", "_blank");
  newWin.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f0f0f0; }
          .no-print { display: none !important; }

          .print-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .hotel-logo img {
            max-width: 120px;
            height: auto;
          }

          .hotel-info {
            text-align: right;
            font-size: 12px;
            line-height: 1.4;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .hotel-name h2 {
            margin: 0;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <div class="hotel-logo">
            <img src="/gdlogo.png" alt="Hotel Logo" />
          </div>
          <div class="hotel-info">
            <div class="hotel-name">
              <h2>Hotel Homes</h2>
            </div>
            <div>- Ghana</div>
            <div>Phone:</div>
            <div>Email: abdulaiosman8080@gmail.com</div>
            <div>Website:</div>
          </div>
        </div>

        ${printContents.innerHTML}
      </body>
    </html>
  `);
  newWin.document.close();
  newWin.focus();
  newWin.print();
  newWin.close();
}
