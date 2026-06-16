import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-CpVer8Pq.mjs";
import { C as House, F as Bell, k as ClipboardList, r as User, u as Plus, v as LogOut, w as FileText, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Brand } from "./Brand-DjJ1aJaD.mjs";
import { g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CollectorLayout-1UsbrCM-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		to: "/home",
		icon: House,
		label: "Home"
	},
	{
		to: "/entry/new",
		icon: Plus,
		label: "Entry"
	},
	{
		to: "/complaint/new",
		icon: FileText,
		label: "Complaint"
	},
	{
		to: "/entries",
		icon: ClipboardList,
		label: "History"
	},
	{
		to: "/profile",
		icon: User,
		label: "Profile"
	}
];
function CollectorLayout({ children }) {
	const navigate = useNavigate();
	const { user, profile, logout } = useAuth();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [confirmLogout, setConfirmLogout] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	(0, import_react.useEffect)(() => {
		if (mounted && !user) navigate({ to: "/" });
	}, [
		mounted,
		user,
		navigate
	]);
	if (!user || !profile) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-surface pb-24 md:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [path !== "/home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => window.history.length > 1 ? window.history.back() : navigate({ to: "/home" }),
							"aria-label": "Go back",
							className: "grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmLogout(true),
								"aria-label": "Logout",
								className: "grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setConfirmLogout(true),
								className: "hidden md:inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-5xl px-4 py-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-md grid-cols-5",
					children: tabs.map((t) => {
						const active = path === t.to || t.to !== "/home" && path.startsWith(t.to);
						const Icon = t.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: t.to,
							className: `flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-9 w-9 place-items-center rounded-full transition-colors ${active ? "bg-primary-soft" : ""}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}), t.label]
						}, t.to);
					})
				})
			}),
			confirmLogout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-2xl bg-card p-6 shadow-elevated",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "Log out?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "You'll need to sign in again to submit entries."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmLogout(false),
								className: "flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-muted",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									await logout();
									toast.success("Logged out");
									navigate({ to: "/" });
								},
								className: "flex-1 rounded-lg bg-destructive py-2.5 text-sm font-medium text-destructive-foreground",
								children: "Logout"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { CollectorLayout as t };
