export type ReceiptRow = { label: string; value: string };

export const escapeHtml = (unsafe = ""): string =>
  String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function buildReceiptHtml(
  rows: ReceiptRow[],
  widthMm = 58,
  title = "Receipt"
): string {
  const rowHtml = rows
    .map(
      (r) =>
        `<div class="row"><div class="label">${escapeHtml(
          r.label
        )}</div><div class="value">${escapeHtml(r.value ?? "")}</div></div>`
    )
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: ${widthMm}mm auto; margin: 0; }
  html, body {
    width: ${widthMm}mm;
    margin: 0;
    padding: 6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Courier New", monospace;
    font-size: 12px;
    color: #000;
    -webkit-print-color-adjust: exact;
  }
  .header { text-align:center; font-weight:700; margin-bottom:8px; }
  .row { display:flex; justify-content:space-between; margin:6px 0; align-items:flex-start; }
  .label { max-width: 45%; text-transform:uppercase; font-size:10px; color:#444; }
  .value { max-width: 52%; text-align:right; word-break:break-word; font-size:12px; }
  hr { border:none; border-top:1px dashed #000; margin:8px 0; }
  .footer { text-align:center; font-size:11px; margin-top:8px; }
  * { box-sizing:border-box; }
</style>
</head>
<body>
  <div class="header">${escapeHtml(title)}</div>
  ${rowHtml}
  <hr />
  <div class="footer">Thank you for your order</div>
</body>
</html>`;
}

export function printHtmlViaIframe(html: string) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    // cleanup
    try {
      document.body.removeChild(iframe);
    } catch {}
    throw new Error("Unable to access iframe document for printing");
  }

  doc.open();
  doc.write(html);
  doc.close();

  // give browser a moment to render, then print and cleanup
  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => {
      try {
        document.body.removeChild(iframe);
      } catch {}
    }, 500);
  }, 250);
}

export function printReceipt(
  rows: ReceiptRow[],
  widthMm = 58,
  title = "Receipt"
) {
  const html = buildReceiptHtml(rows, widthMm, title);
  printHtmlViaIframe(html);
}
