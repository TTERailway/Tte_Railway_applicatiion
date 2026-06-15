import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signInWithEmailAndPassword } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { i as useAuth, n as auth } from "./AuthContext-J9nGEhan.mjs";
import { E as EyeOff, T as Eye, _ as Mail, a as TramFront, o as ShieldCheck, y as Lock } from "../_libs/lucide-react.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cibdsq_j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function signIn(email, password) {
	return await signInWithEmailAndPassword(auth, email, password);
}
function LoginPage() {
	const navigate = useNavigate();
	const { user, profile, loading: authLoading } = useAuth();
	const [email, setEmail] = (0, import_react.useState)("collector@railway.gov.in");
	const [password, setPassword] = (0, import_react.useState)("railway123");
	const [show, setShow] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!authLoading && user && profile) navigate({ to: profile.role === "admin" ? "/admin" : "/home" });
	}, [
		authLoading,
		user,
		profile,
		navigate
	]);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			await signIn(email, password);
			toast.success("Signed in successfully");
		} catch (error) {
			toast.error("Invalid credentials. Try collector@railway.gov.in or admin@railway.gov.in");
		} finally {
			setLoading(false);
		}
	}
	if (authLoading) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gradient-to-br from-primary-soft via-surface to-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TramFront, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
							children: "Indian Railways"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-2xl font-bold",
							children: "TC Daily Earning System"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Sign in to record earnings & file complaints"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "rounded-2xl border border-border bg-card p-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mb-3 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "flex-1 bg-transparent text-sm outline-none",
									placeholder: "you@railway.gov.in",
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mb-3 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: show ? "text" : "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "flex-1 bg-transparent text-sm outline-none",
										placeholder: "••••••••",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShow((s) => !s),
										className: "text-muted-foreground hover:text-foreground",
										"aria-label": "Toggle password visibility",
										children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: remember,
									onChange: (e) => setRemember(e.target.checked),
									className: "h-4 w-4 rounded border-input accent-[var(--color-primary)]"
								}), "Remember me"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "font-medium text-primary hover:underline",
								children: "Forgot password?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-95 disabled:opacity-60",
							children: loading ? "Signing in…" : "Sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl bg-primary-soft p-3 text-xs text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center gap-1.5 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Demo accounts"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Collector: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "collector@railway.gov.in"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Admin: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "admin@railway.gov.in"
								})] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: "Authorized personnel only · Government of India"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
