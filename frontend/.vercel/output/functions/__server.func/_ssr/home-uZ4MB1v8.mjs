import { i as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-CpVer8Pq.mjs";
import { P as Briefcase, S as IndianRupee, j as ChevronRight, k as ClipboardList, p as MessageSquare, u as Plus, w as FileText } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatINR } from "./format-BLGGQJpF.mjs";
import { n as fetchMyEntries } from "./entries-BYSxSnPo.mjs";
import { t as CollectorLayout } from "./CollectorLayout-1UsbrCM-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-uZ4MB1v8.js
var import_jsx_runtime = require_jsx_runtime();
function greeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good Morning";
	if (h < 17) return "Good Afternoon";
	return "Good Evening";
}
function HomePage() {
	const { user, profile, loading: authLoading } = useAuth();
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { data: entries = [] } = useQuery({
		queryKey: ["entries", user?.uid],
		queryFn: () => fetchMyEntries(user.uid),
		enabled: !!user
	});
	const todayEntries = entries.filter((e) => e.date === today);
	const todayAmount = todayEntries.reduce((a, e) => a + e.totalAmount, 0);
	const todayCases = todayEntries.reduce((a, e) => a + e.totalCases, 0);
	if (authLoading || !user || !profile) return null;
	const actions = [
		{
			to: "/entry/new",
			icon: Plus,
			label: "New Daily Entry",
			desc: "Record train, cases & fines",
			tone: "primary"
		},
		{
			to: "/complaint/new",
			icon: FileText,
			label: "Submit Complaint",
			desc: "File an on-duty complaint",
			tone: "soft"
		},
		{
			to: "/entries",
			icon: ClipboardList,
			label: "My Entries",
			desc: "View past daily entries",
			tone: "soft"
		},
		{
			to: "/complaints",
			icon: MessageSquare,
			label: "Complaint History",
			desc: "Track your complaints",
			tone: "soft"
		}
	];
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollectorLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [greeting(), ","]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-0.5 text-2xl font-bold tracking-tight",
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "chip",
						children: [profile.base, " Division"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground",
						children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric"
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-primary p-4 text-primary-foreground shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-medium opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-3.5 w-3.5" }), " Today's Total"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-3xl font-bold",
						children: formatINR(todayAmount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-[11px] opacity-70",
						children: [
							"across ",
							entries.length,
							" entries"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5" }), " Today's Cases"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-3xl font-bold",
						children: todayCases
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: "A/B/C/D/E + smoking"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
				children: "Quick actions"
			}), actions.map((a) => {
				const Icon = a.icon;
				const isPrimary = a.tone === "primary";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: a.to,
					className: `flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-elevated ${isPrimary ? "border-primary/20 bg-primary text-primary-foreground shadow-card" : "border-border bg-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid h-12 w-12 shrink-0 place-items-center rounded-xl ${isPrimary ? "bg-white/15" : "bg-primary-soft text-primary"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-base font-semibold",
								children: a.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `truncate text-xs ${isPrimary ? "opacity-80" : "text-muted-foreground"}`,
								children: a.desc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-5 w-5 ${isPrimary ? "opacity-80" : "text-muted-foreground"}` })
					]
				}, a.to);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/entry/new",
			className: "fixed bottom-24 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated md:hidden",
			"aria-label": "New entry",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
		})
	] });
}
//#endregion
export { HomePage as component };
