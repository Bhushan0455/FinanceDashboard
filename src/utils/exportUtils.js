function triggerDownload(content, filename, mimeType) {
  // Create a Blob (Binary Large Object) — think of it as an in-memory file
  const blob = new Blob([content], { type: mimeType });

  // Create a temporary URL that points to this blob
  const url = URL.createObjectURL(blob);

  // Create an invisible <a> tag
  const link = document.createElement("a");
  link.href = url;
  link.download = filename; // this attribute tells the browser to download, not navigate

  // Add to page, click, then remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Free the memory used by the Blob URL
  URL.revokeObjectURL(url);
}

export function exportToCSV(transactions) {
  if (!transactions || transactions.length === 0) return;

  // Column headers (first row of the CSV)
  const headers = ["Date", "Description", "Category", "Type", "Amount"];

  // Convert each transaction into a CSV row
  // IMPORTANT: we wrap description in quotes in case it contains commas
  const rows = transactions.map((t) =>
    [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`, // escape quotes by doubling them
      t.category,
      t.type,
      t.amount,
    ].join(",")
  );

  // Combine headers + rows with newlines
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Trigger the download
  triggerDownload(csvContent, "transactions.csv", "text/csv;charset=utf-8;");
}

export function exportToJSON(transactions) {
  if (!transactions || transactions.length === 0) return;

  // JSON.stringify with 2-space indent for readability
  const jsonContent = JSON.stringify(transactions, null, 2);

  triggerDownload(jsonContent, "transactions.json", "application/json");
}
