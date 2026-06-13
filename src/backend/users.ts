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
  const q = query(collection(db, "users"), orderBy("name"));
  const snap = await getDocs(q);
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as User) }));
}

export async function fetchUserById(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", id));
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as User) }) : null;
}

export async function updateUserStatus(id: string, status: UserStatus) {
  await updateDoc(doc(db, "users", id), { status });
}
