import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export interface UserProfile {
  name: string;
  email: string;
  role: "admin" | "tc";
  base: string;
  mobile: string;
  employee_id?: string;
  joining?: string;
  status?: "active" | "disabled";
}

export async function fetchProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
