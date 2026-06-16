import { collection, getDocs, query, orderBy, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export type UserRole = "admin" | "tc";
export type UserStatus = "active" | "disabled";

export interface User {
  id: string;
  name: string;
  empId: string;
  email: string;
  mobile: string;
  base: string;
  joining?: string;
  role: UserRole;
  status: UserStatus;
}

export async function fetchAllUsers(): Promise<User[]> {
  const q = collection(db, "users");
  const snap = await getDocs(q);
  const users = snap.docs.map((docSnap) => ({ ...(docSnap.data() as User), id: docSnap.id }));
  return users.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

export async function fetchUserById(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", id));
  return snap.exists() ? { ...(snap.data() as User), id: snap.id } : null;
}

export async function updateUserStatus(id: string, status: UserStatus) {
  await updateDoc(doc(db, "users", id), { status });
}
