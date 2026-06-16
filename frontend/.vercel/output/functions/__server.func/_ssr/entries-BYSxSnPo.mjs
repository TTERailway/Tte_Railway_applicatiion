import "../_libs/firebase.mjs";
import { f as query, h as where, l as orderBy, n as addDoc, o as getDocs, r as collection, t as Timestamp } from "../_libs/@firebase/firestore+[...].mjs";
import { r as db } from "./AuthContext-CpVer8Pq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entries-BYSxSnPo.js
async function fetchMyEntries(uid) {
	return (await getDocs(query(collection(db, "entries"), where("collectorId", "==", uid)))).docs.map((d) => ({
		id: d.id,
		...d.data()
	})).sort((a, b) => b.date.localeCompare(a.date));
}
async function submitEntry(entry) {
	await addDoc(collection(db, "entries"), {
		...entry,
		createdAt: Timestamp.now()
	});
}
async function fetchAllEntries() {
	return (await getDocs(query(collection(db, "entries"), orderBy("date", "desc")))).docs.map((d) => ({
		id: d.id,
		...d.data()
	}));
}
//#endregion
export { fetchMyEntries as n, submitEntry as r, fetchAllEntries as t };
