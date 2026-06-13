import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { fetchAllEntries } from "@/backend/entries";
import { fetchAllComplaints } from "@/backend/complaints";
import { fetchAllUsers } from "@/backend/users";
import { formatINR, formatDate } from "@/lib/format";
import { Users, ClipboardList, IndianRupee, MessageSquareWarning, CheckCircle2, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard · TC System" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const { data: entries = [] } = useQuery({ queryKey: ["admin", "entries"], queryFn: fetchAllEntries });
  const { data: complaints = [] } = useQuery({ queryKey: ["admin", "complaints"], queryFn: fetchAllComplaints });
  const { data: users = [] } = useQuery({ queryKey: ["admin", "users"], queryFn: fetchAllUsers });

  const stats = useMemo(() => {
    const collectors = users.filter((u) => u.role === "tc").length;
    const todayEntries = entries.filter((e) => e.date === today);
    const revenue = todayEntries.reduce((a, e) => a + e.totalAmount, 0);
    const cases = todayEntries.reduce((a, e) => a + e.totalCases, 0);
    const open = complaints.filter((c) => c.status !== "Resolved" && c.status !== "Closed").length;
    const closed = complaints.filter((c) => c.status === "Resolved" || c.status === "Closed").length;
    return { collectors, todayEntries, revenue, cases, open, closed };
  }, [users, entries, complaints, today]);

  const recentComplaints = complaints.slice(0, 5);
  const recentEntries = entries.slice(0, 5);
  const collectorName = (id: string) => users.find((u) => u.id === id)?.name ?? "—";

  const cards = [
    { label: "Total Collectors", value: stats.collectors, icon: Users, tone: "primary" as const },
    { label: "Entries Today", value: stats.todayEntries.length, icon: ClipboardList, tone: "soft" as const },
    { label: "Revenue Today", value: formatINR(stats.revenue), icon: IndianRupee, tone: "primary" as const },
    { label: "Open Complaints", value: stats.open, icon: MessageSquareWarning, tone: "warning" as const },
    { label: "Closed Complaints", value: stats.closed, icon: CheckCircle2, tone: "success" as const },
    { label: "Total Cases Today", value: stats.cases, icon: Briefcase, tone: "soft" as const },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of today's operations across all bases.
        </p>
      </div>

      <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => {
          const Icon = c.icon;
          const tone =
            c.tone === "primary"
              ? "bg-primary text-primary-foreground"
              : c.tone === "warning"
                ? "bg-warning/15 text-warning-foreground"
                : c.tone === "success"
                  ? "bg-success/15 text-success"
                  : "bg-card";
          return (
            <div
              key={c.label}
              className={`rounded-2xl border border-border p-4 shadow-card ${tone}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  {c.label}
                </div>
                <Icon className="h-4 w-4 opacity-80" />
              </div>
              <div className="mt-2 text-2xl font-bold">{c.value}</div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Latest Complaints"
          to="/admin/complaints"
          empty={recentComplaints.length === 0}
        >
          <ul className="divide-y divide-border">
            {recentComplaints.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">#{c.number} · {c.category}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {collectorName(c.collectorId)} · Train {c.train}
                  </div>
                </div>
                <span className="chip">{c.status}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Recent Entries"
          to="/admin/entries"
          empty={recentEntries.length === 0}
        >
          <ul className="divide-y divide-border">
            {recentEntries.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {collectorName(e.collectorId)} · Train {e.trainNumber}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {formatDate(e.date)} · {e.totalCases} cases
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{formatINR(e.totalAmount)}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </AdminLayout>
  );
}

function Panel({
  title,
  to,
  empty,
  children,
}: {
  title: string;
  to: string;
  empty?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <Link to={to as "/admin"} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {empty ? (
        <div className="py-6 text-center text-sm text-muted-foreground">Nothing yet.</div>
      ) : (
        children
      )}
    </div>
  );
}
