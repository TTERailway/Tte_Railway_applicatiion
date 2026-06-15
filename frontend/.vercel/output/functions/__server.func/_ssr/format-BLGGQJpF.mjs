//#region node_modules/.nitro/vite/services/ssr/assets/format-BLGGQJpF.js
function formatINR(n) {
	return "₹" + n.toLocaleString("en-IN");
}
function formatDate(iso) {
	return new Date(iso).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
//#endregion
export { formatINR as n, formatDate as t };
