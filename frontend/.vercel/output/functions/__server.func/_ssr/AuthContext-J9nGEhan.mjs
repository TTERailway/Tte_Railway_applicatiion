import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { i as signOut, n as onAuthStateChanged, t as getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { a as getDoc, c as initializeFirestore, d as persistentMultipleTabManager, i as doc, p as setDoc, s as getFirestore, u as persistentLocalCache } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthContext-J9nGEhan.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getEnv = (key) => {
	if (typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyBVJbFrsYP7q07X3661SMXUHYEL_Qikh2U",
		"VITE_FIREBASE_APP_ID": "1:860023868862:web:4f20832825ac924165fdef",
		"VITE_FIREBASE_AUTH_DOMAIN": "tterailway-3881b.firebaseapp.com",
		"VITE_FIREBASE_MEASUREMENT_ID": "G-7DCBWP8EW4",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "860023868862",
		"VITE_FIREBASE_PROJECT_ID": "tterailway-3881b",
		"VITE_FIREBASE_STORAGE_BUCKET": "tterailway-3881b.firebasestorage.app"
	}) return {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyBVJbFrsYP7q07X3661SMXUHYEL_Qikh2U",
		"VITE_FIREBASE_APP_ID": "1:860023868862:web:4f20832825ac924165fdef",
		"VITE_FIREBASE_AUTH_DOMAIN": "tterailway-3881b.firebaseapp.com",
		"VITE_FIREBASE_MEASUREMENT_ID": "G-7DCBWP8EW4",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "860023868862",
		"VITE_FIREBASE_PROJECT_ID": "tterailway-3881b",
		"VITE_FIREBASE_STORAGE_BUCKET": "tterailway-3881b.firebasestorage.app"
	}[key];
	return process.env[key];
};
var firebaseConfig = {
	apiKey: getEnv("VITE_FIREBASE_API_KEY"),
	authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN"),
	projectId: getEnv("VITE_FIREBASE_PROJECT_ID"),
	storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET"),
	messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
	appId: getEnv("VITE_FIREBASE_APP_ID"),
	measurementId: getEnv("VITE_FIREBASE_MEASUREMENT_ID")
};
var app = getApps().length ? getApp() : initializeApp(firebaseConfig);
var auth = getAuth(app);
var db = typeof window !== "undefined" ? initializeFirestore(app, { localCache: persistentLocalCache({
	tabManager: persistentMultipleTabManager(),
	cacheSizeBytes: -1
}) }) : getFirestore(app);
async function fetchProfile(uid) {
	const snap = await getDoc(doc(db, "users", uid));
	return snap.exists() ? snap.data() : null;
}
async function createDefaultProfile(uid, email) {
	const isAdmin = email.toLowerCase().includes("admin");
	const role = isAdmin ? "admin" : "tc";
	const defaultProfile = {
		name: (isAdmin ? "Divisional Admin" : email.split("@")[0].split(".")[0].replace(/^\w/, (c) => c.toUpperCase())) || "Ticket Collector",
		email,
		role,
		base: "NGP",
		mobile: "",
		status: "active"
	};
	await setDoc(doc(db, "users", uid), defaultProfile);
	return defaultProfile;
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	profile: null,
	loading: true,
	logout: async () => {}
});
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		return onAuthStateChanged(auth, async (u) => {
			setUser(u);
			if (u) {
				let p = await fetchProfile(u.uid);
				if (!p && u.email) try {
					console.log("No profile found for uid, creating default...");
					p = await createDefaultProfile(u.uid, u.email);
				} catch (e) {
					console.error("Error creating default profile:", e);
				}
				setProfile(p);
			} else setProfile(null);
			setLoading(false);
		});
	}, []);
	const logout = async () => {
		await signOut(auth);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			profile,
			loading,
			logout
		},
		children
	});
}
var useAuth = () => (0, import_react.useContext)(AuthContext);
//#endregion
export { useAuth as i, auth as n, db as r, AuthProvider as t };
