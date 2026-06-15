import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as TramFront } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Brand-DjJ1aJaD.js
var import_jsx_runtime = require_jsx_runtime();
function Brand({ subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TramFront, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-bold tracking-wide text-primary",
				children: "INDIAN RAILWAYS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
				children: subtitle ?? "TC Daily Earning & Complaint System"
			})]
		})]
	});
}
//#endregion
export { Brand as t };
