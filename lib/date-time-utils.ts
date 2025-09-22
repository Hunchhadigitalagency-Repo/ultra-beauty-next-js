export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long", // or "short" / "2-digit"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // change to false for 24-hour format
  };

  return date.toLocaleString(undefined, options); // undefined → uses user's locale
}
