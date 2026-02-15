export const printStyles = `
  @page { size: A4; margin: 0.5in; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    height: auto;
    overflow: visible;
    color: black;
    background: white;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  p { margin: 0; }
  .max-w-4xl { max-width: 60rem; margin: 0 auto; }
  .bg-white { background-color: white; }
  .bg-gray-100 { background-color: #F3F4F6; }
  .p-8 { padding: 2rem; }
  .text-black { color: black; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-end { text-align: end; }
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-base { font-size: 1rem; line-height: 1.5rem; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .font-normal { font-weight: 400; }
  .uppercase { text-transform: uppercase; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .ml-16 { margin-left: 4rem; }
  .ml-auto { margin-left: auto; }
  .w-8 { width: 2rem; }
  .w-80 { width: 20rem; }
  .w-full { width: 100%; }
  .pt-1 { padding-top: 0.25rem; }
  .pb-2 { padding-bottom: 0.5rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .leading-relaxed { line-height: 1.625; }
  .border-b { border-bottom-width: 1px; }
  .border-t { border-top-width: 1px; }
  .border-t-2 { border-top-width: 2px; }
  .border-gray-200 { border-color: #e5e7eb; }
  .border-gray-300 { border-color: #d1d5db; }
  .border-gray-400 { border-color: #9ca3af; }
  .border-collapse { border-collapse: collapse; }
  .text-blue-600 { color: #2563eb; }
  .text-green-500 { color: #10B981; }
  .space-y-1 > * + * { margin-top: 0.25rem; }
  .flex { display: flex; }
  .gap-4 { gap: 1rem; }
  .justify-between { justify-content: space-between; }
  .avoid-break { page-break-inside: avoid; }
  table { width: 100%; border-collapse: collapse; page-break-inside: auto; }
  th, td {
    padding: 0.5rem;
    text-align: left;
    font-size: 0.75rem;
    line-height: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  th { font-weight: 600; border-bottom: 1px solid #d1d5db; }
  tr { page-break-inside: avoid; page-break-after: auto; }
  thead { display: table-header-group; }
  @media print {
    table { page-break-inside: auto; }
    tr { page-break-inside: avoid; }
    .avoid-break { page-break-inside: avoid; }
  }
`;
export const generatePrintHTML = (content) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Invoice Print</title>
      <style>${printStyles}</style>
    </head>
    <body>
      <div class="max-w-4xl bg-white p-8 text-black">
        ${content}
      </div>
    </body>
  </html>
`;

export const handlePrintContent = (elementId) => {
  const printContent = document.getElementById(elementId);
  if (!printContent) return;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(generatePrintHTML(printContent.innerHTML));
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
