import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as fetchAllUsers, t as AdminLayout } from "./users-2lvdv8EG.mjs";
import { i as updateComplaintStatus, t as fetchAllComplaints } from "./complaints-B4_EbkKD.mjs";
import { t as formatDate } from "./format-BLGGQJpF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.complaints-CFDnp_6e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"Pending",
	"Under Review",
	"Resolved",
	"Closed"
];
var STATUS_STYLE = {
	Pending: "bg-warning/20 text-warning-foreground",
	"Under Review": "bg-primary-soft text-primary",
	Resolved: "bg-success/15 text-success",
	Closed: "bg-muted text-muted-foreground"
};
function AdminComplaintsPage() {
	const queryClient = useQueryClient();
	const { data: complaints = [] } = useQuery({
		queryKey: ["admin", "complaints"],
		queryFn: fetchAllComplaints
	});
	const { data: users = [] } = useQuery({
		queryKey: ["admin", "users"],
		queryFn: fetchAllUsers
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => complaints.filter((c) => status ? c.status === status : true).filter((c) => {
		if (!q) return true;
		const u = users.find((u) => u.id === c.collectorId);
		const s = q.toLowerCase();
		return c.train.toLowerCase().includes(s) || c.category.toLowerCase().includes(s) || String(c.number).includes(s) || (u?.name.toLowerCase().includes(s) ?? false);
	}).sort((a, b) => b.number - a.number), [
		complaints,
		users,
		q,
		status
	]);
	async function update(id, s) {
		if (!id) return;
		await updateComplaintStatus(id, s);
		toast.success(`Marked as ${s}`);
		queryClient.invalidateQueries({ queryKey: ["admin", "complaints"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Complaint Management"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Review, escalate and close complaints."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center gap-2 rounded-xl border border-input bg-card px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search by collector, train, category, #id",
					className: "flex-1 bg-transparent text-sm outline-none"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: !status,
					onClick: () => setStatus(""),
					label: "All"
				}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: status === s,
					onClick: () => setStatus(s),
					label: s
				}, s))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [rows.map((c) => {
				const u = users.find((u) => u.id === c.collectorId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
										children: [
											"Complaint #",
											c.number,
											" · ",
											formatDate(c.createdAt)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 truncate text-base font-semibold",
										children: c.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											u?.name || c.collectorName || `TC (${c.collectorId.slice(0, 6)})`,
											u?.empId ? ` (${u.empId})` : "",
											" · Train ",
											c.train,
											c.station && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", c.station] })
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[c.status]}`,
								children: c.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: c.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => update(c.id, "Under Review"),
									className: "rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted",
									children: "Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => update(c.id, "Resolved"),
									className: "rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground",
									children: "Resolve"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => update(c.id, "Closed"),
									className: "rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground",
									children: "Close"
								})
							]
						})
					]
				}, c.id);
			}), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground",
				children: "No complaints match."
			})]
		})
	] });
}
function FilterChip({ active, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"}`,
		children: label
	});
}
//#endregion
export { AdminComplaintsPage as component };
