import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export interface UserProfile {
  name: string;
  role: "admin" | "tc";
  base: string;
  mobile: string;
  employee_id?: string;
}

export async function fetchProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
