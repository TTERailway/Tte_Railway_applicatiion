import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import "../_libs/firebase.mjs";
import { i as doc, m as updateDoc, o as getDocs, r as collection } from "../_libs/@firebase/firestore+[...].mjs";
import { i as useAuth, r as db } from "./AuthContext-J9nGEhan.mjs";
import { b as LayoutDashboard, h as Menu, k as ClipboardList, m as MessageSquareWarning, n as Users, t as X, v as LogOut } from "../_libs/lucide-react.mjs";
import { t as Brand } from "./Brand-DjJ1aJaD.mjs";
import { g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-2lvdv8EG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/admin",
		icon: LayoutDashboard,
		label: "Dashboard",
		exact: true
	},
	{
		to: "/admin/entries",
		icon: ClipboardList,
		label: "Daily Entries"
	},
	{
		to: "/admin/complaints",
		icon: MessageSquareWarning,
		label: "Complaints"
	},
	{
		to: "/admin/users",
		icon: Users,
		label: "Manage Users"
	}
];
function AdminLayout({ children }) {
	const navigate = useNavigate();
	const { profile: user, loading, logout } = useAuth();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	(0, import_react.useEffect)(() => {
		if (mounted && !loading && (!user || user.role !== "admin")) navigate({ to: "/" });
	}, [
		mounted,
		loading,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => setOpen(false), [path]);
	if (loading || !user || user.role !== "admin") return null;
	const isActive = (to, exact) => exact ? path === to : path === to || path.startsWith(to + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-background transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-16 items-center justify-between border-b border-border px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { subtitle: "Admin Console" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(false),
							className: "grid h-9 w-9 place-items-center rounded-full text-muted-foreground md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "space-y-1 p-3",
						children: nav.map((n) => {
							const Icon = n.icon;
							const active = isActive(n.to, n.exact);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: n.to,
								className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), n.label]
							}, n.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-3 bottom-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								await logout();
								toast.success("Logged out");
								navigate({ to: "/" });
							},
							className: "flex w-full items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" }), "Logout"]
						})
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => setOpen(false),
				className: "fixed inset-0 z-30 bg-foreground/40 md:hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(true),
							className: "grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-muted md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-[0.18em] text-muted-foreground",
								children: "Admin Console"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-base font-semibold",
								children: ["Welcome back, ", user.name]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden sm:block text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: user.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										user.empId,
										" · ",
										user.base
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground",
								children: (user.name || "User").split(" ").map((p) => p[0]).slice(0, 2).join("")
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-4 md:p-8",
					children
				})]
			})
		]
	});
}
async function fetchAllUsers() {
	return (await getDocs(collection(db, "users"))).docs.map((docSnap) => ({
		id: docSnap.id,
		...docSnap.data()
	})).sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}
async function updateUserStatus(id, status) {
	await updateDoc(doc(db, "users", id), { status });
}
//#endregion
export { fetchAllUsers as n, updateUserStatus as r, AdminLayout as t };
