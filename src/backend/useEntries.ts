import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export interface Entry {
  id?: string;
  tc_id: string;
  tc_name: string;
  base: string;
  mobile: string;
  date: string;
  train_no: string;
  duty_status: string;
  a_nc: number;
  a_amt: number;
  b_nc: number;
  b_amt: number;
  c_nc: number;
  c_amt: number;
  d_nc: number;
  d_amt: number;
  e_nc: number;
  e_amt: number;
  smoking_nc: number;
  smoking_amt: number;
  total_nc: number;
  total_amt: number;
  remarks: string;
  created_at?: Timestamp;
}

export async function fetchMyEntries(uid: string): Promise<Entry[]> {
  const q = query(
    collection(db, "entries"),
    where("tc_id", "==", uid),
    orderBy("date", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Entry));
}

export async function submitEntry(entry: Omit<Entry, "id" | "created_at">) {
  await addDoc(collection(db, "entries"), {
    ...entry,
    created_at: Timestamp.now(),
  });
}

export async function fetchAllEntries(): Promise<Entry[]> {
  const snap = await getDocs(query(collection(db, "entries"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Entry));
}

export async function deleteEntry(id: string) {
  await deleteDoc(doc(db, "entries", id));
}
