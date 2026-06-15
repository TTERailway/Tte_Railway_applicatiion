import { i as require_jsx_runtime, n as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as AuthProvider } from "./AuthContext-J9nGEhan.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C2ZY39V2.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DV-YficG.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-surface px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Please try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Retry"
					})
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-surface px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-6xl font-bold text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1"
			},
			{ title: "Indian Railways · TC Daily Earning System" },
			{
				name: "description",
				content: "Ticket Collector daily earning and complaint management system for Indian Railways field staff."
			},
			{
				name: "theme-color",
				content: "#0B3B75"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$10 = () => import("./profile-BQZeEhHq.mjs");
var Route$10 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Profile · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./home-ShS9Zb4E.mjs");
var Route$9 = createFileRoute("/home")({
	head: () => ({ meta: [{ title: "Home · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./entries-Cex3dXcD.mjs");
var Route$8 = createFileRoute("/entries")({
	head: () => ({ meta: [{ title: "My Entries · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./complaints-D1-XXqa_.mjs");
var Route$7 = createFileRoute("/complaints")({
	head: () => ({ meta: [{ title: "Complaint History · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./routes-Cibdsq_j.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Sign in · Indian Railways TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.index-DTkmN7Pr.mjs");
var Route$5 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./entry.new-CI-k1Ddd.mjs");
var Route$4 = createFileRoute("/entry/new")({
	head: () => ({ meta: [{ title: "New Daily Entry · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./complaint.new-DdJdw9BT.mjs");
var Route$3 = createFileRoute("/complaint/new")({
	head: () => ({ meta: [{ title: "Submit Complaint · TC System" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.users-h2stcpcV.mjs");
var Route$2 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Manage Users · Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.entries-mevUl5oQ.mjs");
var Route$1 = createFileRoute("/admin/entries")({
	head: () => ({ meta: [{ title: "Daily Entries · Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.complaints-CFDnp_6e.mjs");
var Route = createFileRoute("/admin/complaints")({
	head: () => ({ meta: [{ title: "Complaints · Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ProfileRoute = Route$10.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$11
});
var HomeRoute = Route$9.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$11
});
var EntriesRoute = Route$8.update({
	id: "/entries",
	path: "/entries",
	getParentRoute: () => Route$11
});
var ComplaintsRoute = Route$7.update({
	id: "/complaints",
	path: "/complaints",
	getParentRoute: () => Route$11
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AdminIndexRoute = Route$5.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$11
});
var EntryNewRoute = Route$4.update({
	id: "/entry/new",
	path: "/entry/new",
	getParentRoute: () => Route$11
});
var ComplaintNewRoute = Route$3.update({
	id: "/complaint/new",
	path: "/complaint/new",
	getParentRoute: () => Route$11
});
var AdminUsersRoute = Route$2.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => Route$11
});
var AdminEntriesRoute = Route$1.update({
	id: "/admin/entries",
	path: "/admin/entries",
	getParentRoute: () => Route$11
});
var rootRouteChildren = {
	IndexRoute,
	ComplaintsRoute,
	EntriesRoute,
	HomeRoute,
	ProfileRoute,
	AdminComplaintsRoute: Route.update({
		id: "/admin/complaints",
		path: "/admin/complaints",
		getParentRoute: () => Route$11
	}),
	AdminEntriesRoute,
	AdminUsersRoute,
	ComplaintNewRoute,
	EntryNewRoute,
	AdminIndexRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
