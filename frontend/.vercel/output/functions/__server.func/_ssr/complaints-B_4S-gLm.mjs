import "../_libs/firebase.mjs";
import { f as query, h as where, i as doc, l as orderBy, m as updateDoc, n as addDoc, o as getDocs, r as collection } from "../_libs/@firebase/firestore+[...].mjs";
import { r as db } from "./AuthContext-CpVer8Pq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-B_4S-gLm.js
async function fetchMyComplaints(uid) {
	return (await getDocs(query(collection(db, "complaints"), where("collectorId", "==", uid)))).docs.map((d) => ({
		id: d.id,
		...d.data()
	})).sort((a, b) => b.number - a.number);
}
async function submitComplaint(complaint) {
	const number = Date.now();
	await addDoc(collection(db, "complaints"), {
		...complaint,
		number,
		status: "Pending",
		createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	return number;
}
async function fetchAllComplaints() {
	return (await getDocs(query(collection(db, "complaints"), orderBy("number", "desc")))).docs.map((d) => ({
		id: d.id,
		...d.data()
	}));
}
async function updateComplaintStatus(id, status) {
	await updateDoc(doc(db, "complaints", id), { status });
}
//#endregion
export { updateComplaintStatus as i, fetchMyComplaints as n, submitComplaint as r, fetchAllComplaints as t };
