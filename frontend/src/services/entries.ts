import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

export type WorkingStatus = "VIRAT" | "OPEN" | "REST" | "LEAVE" | "VEDANT" | "SQD" | "LAP" | "SICK";

export interface FineCategory {
  cases: number;
  amount: number;
}

export interface Entry {
  id?: string;
  collectorId: string;
  date: string;
  trainNumber: string;
  working: WorkingStatus;
  A: FineCategory;
  B: FineCategory;
  C: FineCategory;
  D: FineCategory;
  E: FineCategory;
  smoking: FineCategory;
  totalCases: number;
  totalAmount: number;
  createdAt?: Timestamp;
}

export async function fetchMyEntries(uid: string): Promise<Entry[]> {
  const q = query(
    collection(db, "entries"),
    where("collectorId", "==", uid),
    orderBy("date", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Entry);
}

export async function submitEntry(entry: Omit<Entry, "id" | "createdAt">) {
  await addDoc(collection(db, "entries"), {
    ...entry,
    createdAt: Timestamp.now(),
  });
}

export async function fetchAllEntries(): Promise<Entry[]> {
  const snap = await getDocs(query(collection(db, "entries"), orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Entry);
}

export async function deleteEntry(id: string) {
  await deleteDoc(doc(db, "entries", id));
}
