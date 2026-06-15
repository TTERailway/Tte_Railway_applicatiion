import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CollectorLayout } from "@/components/CollectorLayout";
import { useAuth } from "@/services/AuthContext";
import { fetchMyEntries } from "@/services/entries";
import { formatINR, formatDate } from "@/lib/format";
import { useMemo, useState } from "react";
import { Search, Plus, ClipboardList, Train } from "lucide-react";

export const Route = createFileRoute("/entries")({
  head: () => ({ meta: [{ title: "My Entries · TC System" }] }),
  component: EntriesPage,
});

function EntriesPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: entries = [] } = useQuery({
    queryKey: ["entries", user?.uid],
    queryFn: () => fetchMyEntries(user!.uid),
    enabled: !!user,
  });
  const [q, setQ] = useState("");
  const [date, setDate] = useState("");

  const filtered = useMemo(
    () =>
      entries
        .filter((e) => {
          if (date && e.date !== date) return false;
          if (q && !e.trainNumber.includes(q.trim())) return false;
          return true;
        })
        .sort((a, b) => b.date.localeCompare(a.date)),
    [entries, q, date],
  );

  if (authLoading || !user) return null;

  return (
    <CollectorLayout>
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">My Entries</h1>
          <p className="text-sm text-muted-foreground">{entries.length} total submissions</p>
        </div>
        <Link
          to="/entry/new"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card"
        >
          <Plus className="h-4 w-4" /> New
        </Link>
      </header>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-input bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by train number"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {filtered.map((e) => (
              <div key={e.id} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{formatDate(e.date)}</div>
                  <span className="chip">{e.working}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <Stat label="Train" value={e.trainNumber} />
                  <Stat label="Cases" value={String(e.totalCases)} />
                  <Stat label="Amount" value={formatINR(e.totalAmount)} highlight />
                </div>
                <button className="mt-3 w-full rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted">
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-card md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Train</th>
                  <th className="px-4 py-3">Working</th>
                  <th className="px-4 py-3 text-right">Cases</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium">{formatDate(e.date)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-mono font-semibold">
                        <Train className="h-3.5 w-3.5 text-primary" /> {e.trainNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="chip">{e.working}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{e.totalCases}</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">
                      {formatINR(e.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </CollectorLayout>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/60 px-2 py-2">
      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className={`mt-0.5 text-sm font-bold ${highlight ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
        <ClipboardList className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold">No entries yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Submit your first daily entry to see it here.
      </p>
      <Link
        to="/entry/new"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        <Plus className="h-4 w-4" /> New Entry
      </Link>
    </div>
  );
}
