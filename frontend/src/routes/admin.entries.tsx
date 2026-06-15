import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { fetchAllEntries } from "@/services/entries";
import { fetchAllUsers } from "@/services/users";
import { formatINR, formatDate } from "@/lib/format";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/entries")({
  head: () => ({ meta: [{ title: "Daily Entries · Admin" }] }),
  component: AdminEntriesPage,
});

function AdminEntriesPage() {
  const { data: entries = [] } = useQuery({
    queryKey: ["admin", "entries"],
    queryFn: fetchAllEntries,
  });
  const { data: users = [] } = useQuery({ queryKey: ["admin", "users"], queryFn: fetchAllUsers });
  const [date, setDate] = useState("");
  const [base, setBase] = useState("");
  const [collector, setCollector] = useState("");
  const [train, setTrain] = useState("");

  const collectors = users.filter((u) => u.role === "tc");
  const bases = Array.from(new Set(collectors.map((c) => c.base)));

  const rows = useMemo(() => {
    return entries
      .map((e) => ({ e, u: users.find((u) => u.id === e.collectorId) }))
      .filter(({ e, u }) => {
        if (!u) return false;
        if (date && e.date !== date) return false;
        if (base && u.base !== base) return false;
        if (collector && u.id !== collector) return false;
        if (train && !e.trainNumber.includes(train)) return false;
        return true;
      })
      .sort((a, b) => b.e.date.localeCompare(a.e.date));
  }, [entries, users, date, base, collector, train]);

  const totalAmount = rows.reduce((a, r) => a + r.e.totalAmount, 0);
  const totalCases = rows.reduce((a, r) => a + r.e.totalCases, 0);

  return (
    <AdminLayout>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Daily Entries</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} records · {totalCases} cases · {formatINR(totalAmount)}
          </p>
        </div>
        <button
          onClick={() => toast.success("Export queued (demo)")}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card"
        >
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      <div className="mb-4 grid gap-2 rounded-2xl border border-border bg-card p-4 shadow-card md:grid-cols-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
        />
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">All bases</option>
          {bases.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <select
          value={collector}
          onChange={(e) => setCollector(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
        >
          <option value="">All collectors</option>
          {collectors.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={train}
            onChange={(e) => setTrain(e.target.value)}
            placeholder="Train no."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {[
                "Date",
                "Collector",
                "Base",
                "Train",
                "Working",
                "A",
                "B",
                "C",
                "D",
                "E",
                "Smoke",
                "Cases",
                "Amount",
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-3 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(({ e, u }) => (
              <tr key={e.id} className="hover:bg-muted/40">
                <td className="whitespace-nowrap px-3 py-3 font-medium">{formatDate(e.date)}</td>
                <td className="whitespace-nowrap px-3 py-3">{u?.name}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="chip">{u?.base}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-mono font-semibold">
                  {e.trainNumber}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <span className="chip">{e.working}</span>
                </td>
                <td className="px-3 py-3">{e.A.cases}</td>
                <td className="px-3 py-3">{e.B.cases}</td>
                <td className="px-3 py-3">{e.C.cases}</td>
                <td className="px-3 py-3">{e.D.cases}</td>
                <td className="px-3 py-3">{e.E.cases}</td>
                <td className="px-3 py-3">{e.smoking.cases}</td>
                <td className="px-3 py-3 font-semibold">{e.totalCases}</td>
                <td className="px-3 py-3 font-bold text-primary">{formatINR(e.totalAmount)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={13} className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No entries match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
