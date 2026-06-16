import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-CpVer8Pq.mjs";
import { L as BadgeCheck, N as Calendar, _ as Mail, d as Phone, f as Pencil, g as MapPin, v as LogOut, x as KeyRound } from "../_libs/lucide-react.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDate } from "./format-BLGGQJpF.mjs";
import { t as CollectorLayout } from "./CollectorLayout-1UsbrCM-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DXrusBA1.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate();
	const { profile, loading: authLoading, logout } = useAuth();
	if (authLoading || !profile) return null;
	const initials = profile.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollectorLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "mb-5 text-2xl font-bold",
		children: "Profile"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-card shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary p-6 text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl font-bold",
						children: initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xl font-bold",
							children: profile.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5" }),
								" ",
								profile.employee_id ?? profile.mobile
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 p-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
						label: "Email",
						children: profile.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
						label: "Mobile",
						children: profile.mobile
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						label: "Base",
						children: [profile.base, " Division"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
						label: "Joining Date",
						children: profile.joining ? formatDate(profile.joining) : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 border-t border-border p-5 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), " Edit profile"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }), " Change password"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: async () => {
							await logout();
							toast.success("Logged out successfully");
							navigate({ to: "/" });
						},
						className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive py-3 text-sm font-semibold hover:bg-destructive/10 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
					})
				]
			})
		]
	})] });
}
function Row({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-muted/50 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
			children: [
				icon,
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 truncate text-sm font-semibold",
			children
		})]
	});
}
//#endregion
export { ProfilePage as component };
