import { i as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-J9nGEhan.mjs";
import { a as TramFront, u as Plus, w as FileText } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as fetchMyComplaints } from "./complaints-B4_EbkKD.mjs";
import { t as formatDate } from "./format-BLGGQJpF.mjs";
import { t as CollectorLayout } from "./CollectorLayout-DNXSnmBf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-D1-XXqa_.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS_STYLE = {
	Pending: "bg-warning/20 text-warning-foreground",
	"Under Review": "bg-primary-soft text-primary",
	Resolved: "bg-success/15 text-success",
	Closed: "bg-muted text-muted-foreground"
};
function ComplaintsPage() {
	const { user, loading: authLoading } = useAuth();
	const { data: complaints = [] } = useQuery({
		queryKey: ["complaints", user?.uid],
		queryFn: () => fetchMyComplaints(user.uid),
		enabled: !!user
	});
	if (authLoading || !user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollectorLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-5 flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Complaint History"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [complaints.length, " complaints filed"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/complaint/new",
			className: "inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New"]
		})]
	}), complaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border bg-card p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: "No complaints yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "All quiet on your routes."
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: complaints.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-card p-4 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: ["Complaint #", c.number]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 truncate text-base font-semibold",
								children: c.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TramFront, { className: "h-3.5 w-3.5" }),
									" Train ",
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
					className: "mt-3 line-clamp-2 text-sm text-muted-foreground",
					children: c.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Submitted ", formatDate(c.createdAt)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "font-semibold text-primary hover:underline",
						children: "Open →"
					})]
				})
			]
		}, c.id))
	})] });
}
//#endregion
export { ComplaintsPage as component };
