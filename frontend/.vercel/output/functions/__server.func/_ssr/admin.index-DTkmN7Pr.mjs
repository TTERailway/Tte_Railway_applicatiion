import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { A as CircleCheck, P as Briefcase, R as ArrowRight, S as IndianRupee, k as ClipboardList, m as MessageSquareWarning, n as Users } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchAllUsers, t as AdminLayout } from "./users-2lvdv8EG.mjs";
import { t as fetchAllComplaints } from "./complaints-B4_EbkKD.mjs";
import { n as formatINR, t as formatDate } from "./format-BLGGQJpF.mjs";
import { t as fetchAllEntries } from "./entries-CH_btG63.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DTkmN7Pr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { data: entries = [] } = useQuery({
		queryKey: ["admin", "entries"],
		queryFn: fetchAllEntries
	});
	const { data: complaints = [] } = useQuery({
		queryKey: ["admin", "complaints"],
		queryFn: fetchAllComplaints
	});
	const { data: users = [] } = useQuery({
		queryKey: ["admin", "users"],
		queryFn: fetchAllUsers
	});
	const stats = (0, import_react.useMemo)(() => {
		const collectors = users.filter((u) => u.role?.toLowerCase() === "tc" || u.role?.toLowerCase() === "collector").length;
		const todayEntries = entries.filter((e) => e.date === today);
		return {
			collectors,
			todayEntries,
			revenue: todayEntries.reduce((a, e) => a + e.totalAmount, 0),
			cases: todayEntries.reduce((a, e) => a + e.totalCases, 0),
			open: complaints.filter((c) => c.status !== "Resolved" && c.status !== "Closed").length,
			closed: complaints.filter((c) => c.status === "Resolved" || c.status === "Closed").length
		};
	}, [
		users,
		entries,
		complaints,
		today
	]);
	const recentComplaints = complaints.slice(0, 5);
	const recentEntries = entries.slice(0, 5);
	const cards = [
		{
			label: "Total Collectors",
			value: stats.collectors,
			icon: Users,
			tone: "primary"
		},
		{
			label: "Entries Today",
			value: stats.todayEntries.length,
			icon: ClipboardList,
			tone: "soft"
		},
		{
			label: "Revenue Today",
			value: formatINR(stats.revenue),
			icon: IndianRupee,
			tone: "primary"
		},
		{
			label: "Open Complaints",
			value: stats.open,
			icon: MessageSquareWarning,
			tone: "warning"
		},
		{
			label: "Closed Complaints",
			value: stats.closed,
			icon: CircleCheck,
			tone: "success"
		},
		{
			label: "Total Cases Today",
			value: stats.cases,
			icon: Briefcase,
			tone: "soft"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Overview of today's operations across all bases."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
			children: cards.map((c) => {
				const Icon = c.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl border border-border p-4 shadow-card ${c.tone === "primary" ? "bg-primary text-primary-foreground" : c.tone === "warning" ? "bg-warning/15 text-warning-foreground" : c.tone === "success" ? "bg-success/15 text-success" : "bg-card"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-semibold uppercase tracking-wide opacity-80",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 opacity-80" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-bold",
						children: c.value
					})]
				}, c.label);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Latest Complaints",
				to: "/admin/complaints",
				empty: recentComplaints.length === 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: recentComplaints.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-sm font-semibold",
								children: [
									"#",
									c.number,
									" · ",
									c.category
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									users.find((u) => u.id === c.collectorId)?.name || c.collectorName || `TC (${c.collectorId.slice(0, 6)})`,
									" ",
									"· Train ",
									c.train
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip",
							children: c.status
						})]
					}, c.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent Entries",
				to: "/admin/entries",
				empty: recentEntries.length === 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: recentEntries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-sm font-semibold",
								children: [
									users.find((u) => u.id === e.collectorId)?.name || e.collectorName || `TC (${e.collectorId.slice(0, 6)})`,
									" ",
									"· Train ",
									e.trainNumber
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									formatDate(e.date),
									" · ",
									e.totalCases,
									" cases"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold text-primary",
								children: formatINR(e.totalAmount)
							})
						})]
					}, e.id))
				})
			})]
		})
	] });
}
function Panel({ title, to, empty, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
				children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
			})]
		}), empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-6 text-center text-sm text-muted-foreground",
			children: "Nothing yet."
		}) : children]
	});
}
//#endregion
export { AdminDashboard as component };
