import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { D as Download, c as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as fetchAllUsers, t as AdminLayout } from "./users-DylelRKE.mjs";
import { n as formatINR, t as formatDate } from "./format-BLGGQJpF.mjs";
import { t as fetchAllEntries } from "./entries-BYSxSnPo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.entries-Ch_rQYoi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminEntriesPage() {
	const { data: entries = [] } = useQuery({
		queryKey: ["admin", "entries"],
		queryFn: fetchAllEntries
	});
	const { data: users = [] } = useQuery({
		queryKey: ["admin", "users"],
		queryFn: fetchAllUsers
	});
	const [date, setDate] = (0, import_react.useState)("");
	const [base, setBase] = (0, import_react.useState)("");
	const [collector, setCollector] = (0, import_react.useState)("");
	const [train, setTrain] = (0, import_react.useState)("");
	const collectors = users.filter((u) => u.role?.toLowerCase() === "tc" || u.role?.toLowerCase() === "collector");
	const bases = Array.from(new Set(collectors.map((c) => c.base)));
	const rows = (0, import_react.useMemo)(() => {
		console.log("DEBUG: Admin Entries Page Data", {
			entries,
			users
		});
		return entries.map((e) => {
			const u = users.find((u) => u.id === e.collectorId);
			console.log(`DEBUG: Mapping entry ${e.id} with collectorId ${e.collectorId}. Found profile:`, u);
			return {
				e,
				u
			};
		}).filter(({ e, u }) => {
			if (date && e.date !== date) return false;
			if (base && (!u || u.base !== base)) return false;
			if (collector && (!u || u.id !== collector)) return false;
			if (train && !e.trainNumber.includes(train)) return false;
			return true;
		}).sort((a, b) => b.e.date.localeCompare(a.e.date));
	}, [
		entries,
		users,
		date,
		base,
		collector,
		train
	]);
	const totalAmount = rows.reduce((a, r) => a + r.e.totalAmount, 0);
	const totalCases = rows.reduce((a, r) => a + r.e.totalCases, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Daily Entries"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					rows.length,
					" records · ",
					totalCases,
					" cases · ",
					formatINR(totalAmount)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => toast.success("Export queued (demo)"),
				className: "inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-2 rounded-2xl border border-border bg-card p-4 shadow-card md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: base,
					onChange: (e) => setBase(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All bases"
					}), bases.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: b }, b))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: collector,
					onChange: (e) => setCollector(e.target.value),
					className: "rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "All collectors"
					}), collectors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: train,
						onChange: (e) => setTrain(e.target.value),
						placeholder: "Train no.",
						className: "flex-1 bg-transparent text-sm outline-none"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl border border-border bg-card shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
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
						"Amount"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "whitespace-nowrap px-3 py-3",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
					className: "divide-y divide-border",
					children: [rows.map(({ e, u }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover:bg-muted/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-3 font-medium",
								children: formatDate(e.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-3",
								children: u?.name || e.collectorName || `TC (${e.collectorId.slice(0, 6)})`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: u?.base || e.collectorBase || "N/A"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-3 font-mono font-semibold",
								children: e.trainNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip",
									children: e.working
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.A.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.B.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.C.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.D.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.E.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3",
								children: e.smoking.cases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-semibold",
								children: e.totalCases
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 font-bold text-primary",
								children: formatINR(e.totalAmount)
							})
						]
					}, e.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 13,
						className: "px-3 py-10 text-center text-sm text-muted-foreground",
						children: "No entries match the current filters."
					}) })]
				})]
			})
		})
	] });
}
//#endregion
export { AdminEntriesPage as component };
