export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
