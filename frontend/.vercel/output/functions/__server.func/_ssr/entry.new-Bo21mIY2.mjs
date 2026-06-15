import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as useAuth } from "./AuthContext-J9nGEhan.mjs";
import { M as Check, O as Cloud, P as Briefcase, S as IndianRupee, a as TramFront, d as Phone, g as MapPin, l as Save, r as User } from "../_libs/lucide-react.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as formatINR } from "./format-BLGGQJpF.mjs";
import { r as submitEntry } from "./entries-CH_btG63.mjs";
import { t as CollectorLayout } from "./CollectorLayout-DTtu4cIF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entry.new-Bo21mIY2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WORKING_OPTIONS = [
	"VIRAT",
	"OPEN",
	"REST",
	"LEAVE",
	"VEDANT",
	"SQD",
	"LAP",
	"SICK"
];
var CATEGORIES = [
	{
		key: "A",
		label: "A Case",
		hint: "WT / fare evader"
	},
	{
		key: "B",
		label: "B Case",
		hint: "Excess fare"
	},
	{
		key: "C",
		label: "C Case",
		hint: "Without proper ticket"
	},
	{
		key: "D",
		label: "D Case",
		hint: "Luggage / parcel"
	},
	{
		key: "E",
		label: "E Case",
		hint: "Other"
	},
	{
		key: "smoking",
		label: "Smoking Case",
		hint: "Smoking on board"
	}
];
function NewEntryPage() {
	const { user, profile, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [train, setTrain] = (0, import_react.useState)("");
	const [working, setWorking] = (0, import_react.useState)("VIRAT");
	const [cats, setCats] = (0, import_react.useState)({
		A: {
			cases: 0,
			amount: 0
		},
		B: {
			cases: 0,
			amount: 0
		},
		C: {
			cases: 0,
			amount: 0
		},
		D: {
			cases: 0,
			amount: 0
		},
		E: {
			cases: 0,
			amount: 0
		},
		smoking: {
			cases: 0,
			amount: 0
		}
	});
	const totals = (0, import_react.useMemo)(() => {
		return {
			tc: Object.values(cats).reduce((a, c) => a + (c.cases || 0), 0),
			ta: Object.values(cats).reduce((a, c) => a + (c.amount || 0), 0)
		};
	}, [cats]);
	function update(key, field, v) {
		const num = v === "" ? 0 : Math.max(0, parseInt(v, 10) || 0);
		setCats((c) => ({
			...c,
			[key]: {
				...c[key],
				[field]: num
			}
		}));
	}
	async function submit() {
		if (authLoading || !user || !profile) return;
		if (!train.trim()) {
			toast.error("Please enter the train number");
			return;
		}
		await submitEntry({
			collectorId: user.uid,
			collectorName: profile.name,
			collectorBase: profile.base,
			date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			trainNumber: train.trim(),
			working,
			A: cats.A,
			B: cats.B,
			C: cats.C,
			D: cats.D,
			E: cats.E,
			smoking: cats.smoking,
			totalCases: totals.tc,
			totalAmount: totals.ta
		});
		toast.success("Daily entry saved", { description: `${totals.tc} cases · ${formatINR(totals.ta)}` });
		navigate({ to: "/entries" });
	}
	if (authLoading || !user || !profile) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CollectorLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "New Daily Entry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Fields auto-save as draft. Submit when complete."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "h-3.5 w-3.5" }), " Draft autosaved"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Your Details",
			subtitle: "Auto-filled from profile",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
					label: "Collector",
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
					label: "Base",
					children: profile.base
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
					label: "Mobile",
					children: profile.mobile
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4" }),
					label: "Date",
					children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
						day: "2-digit",
						month: "short",
						year: "numeric"
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Train Information",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Train Number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-3 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TramFront, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: train,
						onChange: (e) => setTrain(e.target.value),
						inputMode: "numeric",
						placeholder: "e.g. 22973",
						className: "flex-1 bg-transparent text-lg font-semibold tracking-wide outline-none"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Working Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
					children: WORKING_OPTIONS.map((w) => {
						const active = working === w;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setWorking(w),
							className: `shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`,
							children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline h-3.5 w-3.5" }), w]
						}, w);
					})
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Fine Categories",
			subtitle: "Tap a category to record cases and fine collected",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: CATEGORIES.map((cat) => {
					const v = cats[cat.key];
					const filled = v.cases > 0 || v.amount > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-xl border p-4 transition-colors ${filled ? "border-primary/40 bg-primary-soft" : "border-border bg-card"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold",
								children: cat.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: cat.hint
							})] }), filled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "Cases",
								value: v.cases,
								onChange: (s) => update(cat.key, "cases", s)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberInput, {
								label: "Amount",
								prefix: "₹",
								value: v.amount,
								onChange: (s) => update(cat.key, "amount", s)
							})]
						})]
					}, cat.key);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 md:h-24" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-x-0 bottom-16 z-30 border-t border-border bg-background/95 backdrop-blur md:bottom-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 rounded-xl bg-primary-soft px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 text-xs font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Cases" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-bold text-primary",
							children: totals.tc
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-bold text-primary",
							children: formatINR(totals.ta)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: submit,
					className: "flex h-14 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-5 w-5" }), " Save"]
				})]
			})
		})
	] });
}
function Section({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 rounded-2xl border border-border bg-card p-5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: subtitle
			})]
		}), children]
	});
}
function Grid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3",
		children
	});
}
function Field({ icon, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-muted/60 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
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
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
		children
	});
}
function NumberInput({ label, value, onChange, prefix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 rounded-lg border border-input bg-background px-2.5 py-2 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
			children: [prefix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				inputMode: "numeric",
				value: value === 0 ? "" : String(value),
				onChange: (e) => onChange(e.target.value.replace(/[^0-9]/g, "")),
				placeholder: "0",
				className: "w-full bg-transparent text-base font-semibold outline-none"
			})]
		})]
	});
}
//#endregion
export { NewEntryPage as component };
