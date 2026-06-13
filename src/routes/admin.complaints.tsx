import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { fetchAllComplaints, updateComplaintStatus, type ComplaintStatus } from "@/backend/complaints";
import { fetchAllUsers } from "@/backend/users";
import { formatDate } from "@/lib/format";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/complaints")({
  head: () => ({ meta: [{ title: "Complaints · Admin" }] }),
  component: AdminComplaintsPage,
});

const STATUSES: ComplaintStatus[] = ["Pending", "Under Review", "Resolved", "Closed"];
const STATUS_STYLE: Record<ComplaintStatus, string> = {
  Pending: "bg-warning/20 text-warning-foreground",
  "Under Review": "bg-primary-soft text-primary",
  Resolved: "bg-success/15 text-success",
  Closed: "bg-muted text-muted-foreground",
};

function AdminComplaintsPage() {
  const queryClient = useQueryClient();
  const { data: complaints = [] } = useQuery({ queryKey: ["admin", "complaints"], queryFn: fetchAllComplaints });
  const { data: users = [] } = useQuery({ queryKey: ["admin", "users"], queryFn: fetchAllUsers });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"" | ComplaintStatus>("");

  const rows = useMemo(
    () =>
      complaints
        .filter((c) => (status ? c.status === status : true))
        .filter((c) => {
          if (!q) return true;
          const u = users.find((u) => u.id === c.collectorId);
          const s = q.toLowerCase();
          return (
            c.train.toLowerCase().includes(s) ||
            c.category.toLowerCase().includes(s) ||
            String(c.number).includes(s) ||
            (u?.name.toLowerCase().includes(s) ?? false)
          );
        })
        .sort((a, b) => b.number - a.number),
    [complaints, users, q, status],
  );

  async function update(id: string, s: ComplaintStatus) {
    await updateComplaintStatus(id, s);
    toast.success(`Marked as ${s}`);
    queryClient.invalidateQueries(["admin", "complaints"]);
  }

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Complaint Management</h1>
        <p className="text-sm text-muted-foreground">Review, escalate and close complaints.</p>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-input bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by collector, train, category, #id"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip active={!status} onClick={() => setStatus("")} label="All" />
          {STATUSES.map((s) => (
            <FilterChip key={s} active={status === s} onClick={() => setStatus(s)} label={s} />
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {rows.map((c) => {
          const u = users.find((u) => u.id === c.collectorId);
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Complaint #{c.number} · {formatDate(c.createdAt)}
                  </div>
                  <div className="mt-0.5 truncate text-base font-semibold">{c.category}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {u?.name} ({u?.empId}) · Train {c.train}
                    {c.station && <> · {c.station}</>}
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => update(c.id, "Under Review")}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Review
                </button>
                <button
                  onClick={() => update(c.id, "Resolved")}
                  className="rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground"
                >
                  Resolve
                </button>
                <button
                  onClick={() => update(c.id, "Closed")}
                  className="rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No complaints match.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}
