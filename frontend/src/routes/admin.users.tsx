import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/AdminLayout";
import { fetchAllUsers, updateUserStatus } from "@/services/users";
import { Eye, Pencil, Ban, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Manage Users · Admin" }] }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({ queryKey: ["admin", "users"], queryFn: fetchAllUsers });

  const collectors = users.filter((u) => u.role === "tc");

  async function toggleStatus(u: (typeof collectors)[number]) {
    const nextStatus = u.status === "active" ? "disabled" : "active";
    await updateUserStatus(u.id, nextStatus);
    toast.success(`${u.name} ${nextStatus === "active" ? "enabled" : "disabled"}`);
    queryClient.invalidateQueries(["admin", "users"]);
  }

  return (
    <AdminLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">{collectors.length} collectors registered.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Employee ID</th>
              <th className="px-4 py-3">Base</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {u.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{u.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono">{u.empId}</td>
                <td className="px-4 py-3">
                  <span className="chip">{u.base}</span>
                </td>
                <td className="px-4 py-3">{u.mobile}</td>
                <td className="px-4 py-3">
                  {u.status === "active" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                      <CheckCircle2 className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                      Disabled
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <IconBtn onClick={() => toast.message(`Viewing ${u.name}`)} label="View">
                      <Eye className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn onClick={() => toast.message(`Editing ${u.name}`)} label="Edit">
                      <Pencil className="h-4 w-4" />
                    </IconBtn>
                    <IconBtn
                      onClick={() => toggleStatus(u)}
                      label={u.status === "active" ? "Disable" : "Enable"}
                    >
                      <Ban className="h-4 w-4" />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}
