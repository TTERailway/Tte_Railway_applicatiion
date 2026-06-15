import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-J9nGEhan.mjs";
import { A as CircleCheck, i as TriangleAlert, s as Send } from "../_libs/lucide-react.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as submitComplaint } from "./complaints-B4_EbkKD.mjs";
import { t as CollectorLayout } from "./CollectorLayout-DNXSnmBf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaint.new-DdJdw9BT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Electrical Issue",
	"Cleanliness",
	"Catering",
	"Security",
	"Passenger Misconduct",
	"Coach Damage",
	"Other"
];
var PRIORITIES = [
	"Low",
	"Medium",
	"High"
];
function NewComplaintPage() {
	const { user, profile, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [category, setCategory] = (0, import_react.useState)(CATEGORIES[0]);
	const [train, setTrain] = (0, import_react.useState)("");
	const [station, setStation] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)("Medium");
	const [done, setDone] = (0, import_react.useState)(null);
	if (authLoading || !user || !profile) return null;
	async function submit(e) {
		e.preventDefault();
		if (!user || !profile) return;
		if (!train.trim() || !description.trim()) {
			toast.error("Please fill required fields");
			return;
		}
		setDone({ number: await submitComplaint({
			collectorId: user.uid,
			collectorName: profile.name,
			collectorBase: profile.base,
			category,
			train: train.trim(),
			station: station.trim(),
			description: description.trim(),
			priority
		}) });
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectorLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-xl font-bold",
				children: "Complaint Submitted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Your complaint has been registered and forwarded to the division office."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl bg-primary-soft p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-wide text-primary",
					children: "Reference Number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-2xl font-bold text-primary",
					children: ["#", done.number]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/complaints",
					className: "flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-muted",
					children: "View history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/home" }),
					className: "flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground",
					children: "Back to home"
				})]
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollectorLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: "Submit Complaint"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Provide details — the division office will review within 24 hours."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "rounded-2xl border border-border bg-card p-5 shadow-card space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				required: true,
				children: "Complaint Category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: category,
				onChange: (e) => setCategory(e.target.value),
				className: "w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					required: true,
					children: "Train Number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: train,
					onChange: (e) => setTrain(e.target.value),
					placeholder: "e.g. 22973",
					inputMode: "numeric",
					className: "w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30",
					required: true
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Station" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: station,
					onChange: (e) => setStation(e.target.value),
					placeholder: "e.g. NGP",
					className: "w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				required: true,
				children: "Description"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: description,
				onChange: (e) => setDescription(e.target.value),
				rows: 5,
				placeholder: "Describe the issue clearly…",
				className: "w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30",
				required: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: PRIORITIES.map((p) => {
					const active = p === priority;
					const tone = p === "High" ? "destructive" : p === "Medium" ? "warning" : "primary";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPriority(p),
						className: `rounded-xl border py-3 text-sm font-semibold transition-colors ${active ? tone === "destructive" ? "border-destructive bg-destructive/10 text-destructive" : tone === "warning" ? "border-warning bg-warning/15 text-warning-foreground" : "border-primary bg-primary-soft text-primary" : "border-border bg-card text-muted-foreground hover:bg-muted"}`,
						children: [p === "High" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mr-1 inline h-3.5 w-3.5" }), p]
					}, p);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				className: "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Submit Complaint"]
			})
		]
	})] });
}
function Label({ children, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
		children: [
			children,
			" ",
			required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive",
				children: "*"
			})
		]
	});
}
//#endregion
export { NewComplaintPage as component };
