// Simple in-memory + localStorage mock store for the prototype.
import { useEffect, useState } from "react";

export type Role = "collector" | "admin";

export interface User {
  id: string;
  name: string;
  empId: string;
  email: string;
  mobile: string;
  base: string;
  joining: string;
  role: Role;
  status: "active" | "disabled";
}

export type WorkingStatus =
  | "VIRAT"
  | "OPEN"
  | "REST"
  | "LEAVE"
  | "VEDANT"
  | "SQD"
  | "LAP"
  | "SICK";

export interface FineCategory {
  cases: number;
  amount: number;
}

export interface DailyEntry {
  id: string;
  collectorId: string;
  date: string; // ISO date
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
}

export type ComplaintStatus = "Pending" | "Under Review" | "Resolved" | "Closed";
export type ComplaintPriority = "Low" | "Medium" | "High";

export interface Complaint {
  id: string;
  collectorId: string;
  number: number;
  category: string;
  train: string;
  station: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
}

interface DB {
  users: User[];
  entries: DailyEntry[];
  complaints: Complaint[];
  session: { userId: string | null };
}

const STORAGE_KEY = "rly_tc_db_v1";

function seed(): DB {
  const users: User[] = [
    {
      id: "u1",
      name: "S G Sathwane",
      empId: "TC-44219",
      email: "collector@railway.gov.in",
      mobile: "98765 43210",
      base: "NGP",
      joining: "2014-08-12",
      role: "collector",
      status: "active",
    },
    {
      id: "u2",
      name: "R K Verma",
      empId: "TC-44102",
      email: "rkverma@railway.gov.in",
      mobile: "98111 22233",
      base: "NGP",
      joining: "2012-03-04",
      role: "collector",
      status: "active",
    },
    {
      id: "u3",
      name: "A Sharma",
      empId: "TC-49011",
      email: "asharma@railway.gov.in",
      mobile: "99880 11223",
      base: "BPL",
      joining: "2018-11-22",
      role: "collector",
      status: "active",
    },
    {
      id: "admin",
      name: "Divisional Admin",
      empId: "ADM-001",
      email: "admin@railway.gov.in",
      mobile: "98000 00000",
      base: "NGP",
      joining: "2008-01-01",
      role: "admin",
      status: "active",
    },
  ];

  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const daysAgo = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return iso(d);
  };

  const mk = (
    id: string,
    collectorId: string,
    date: string,
    train: string,
    working: WorkingStatus,
    cats: Partial<Record<"A" | "B" | "C" | "D" | "E" | "smoking", FineCategory>>,
  ): DailyEntry => {
    const zero = { cases: 0, amount: 0 };
    const A = cats.A ?? zero;
    const B = cats.B ?? zero;
    const C = cats.C ?? zero;
    const D = cats.D ?? zero;
    const E = cats.E ?? zero;
    const smoking = cats.smoking ?? zero;
    const totalCases = A.cases + B.cases + C.cases + D.cases + E.cases + smoking.cases;
    const totalAmount =
      A.amount + B.amount + C.amount + D.amount + E.amount + smoking.amount;
    return { id, collectorId, date, trainNumber: train, working, A, B, C, D, E, smoking, totalCases, totalAmount };
  };

  const entries: DailyEntry[] = [
    mk("e1", "u1", daysAgo(0), "22973", "VIRAT", {
      A: { cases: 2, amount: 3600 },
      B: { cases: 1, amount: 350 },
      C: { cases: 4, amount: 0 },
      smoking: { cases: 2, amount: 0 },
    }),
    mk("e2", "u1", daysAgo(1), "12860", "OPEN", {
      A: { cases: 1, amount: 1800 },
      B: { cases: 2, amount: 700 },
    }),
    mk("e3", "u1", daysAgo(2), "11040", "VIRAT", {
      A: { cases: 3, amount: 5400 },
      C: { cases: 2, amount: 0 },
    }),
    mk("e4", "u2", daysAgo(0), "12721", "VIRAT", {
      A: { cases: 4, amount: 7200 },
      B: { cases: 1, amount: 350 },
    }),
    mk("e5", "u3", daysAgo(0), "20823", "OPEN", {
      A: { cases: 1, amount: 1800 },
      B: { cases: 3, amount: 1050 },
    }),
  ];

  const complaints: Complaint[] = [
    {
      id: "c1",
      collectorId: "u1",
      number: 241,
      category: "Electrical Issue",
      train: "22973",
      station: "NGP",
      description: "AC not working in coach B3.",
      priority: "High",
      status: "Pending",
      createdAt: daysAgo(0),
    },
    {
      id: "c2",
      collectorId: "u1",
      number: 238,
      category: "Cleanliness",
      train: "12860",
      station: "BPQ",
      description: "Toilets unclean since boarding.",
      priority: "Medium",
      status: "Under Review",
      createdAt: daysAgo(2),
    },
    {
      id: "c3",
      collectorId: "u2",
      number: 240,
      category: "Catering",
      train: "12721",
      station: "SC",
      description: "Substandard meals served.",
      priority: "Low",
      status: "Resolved",
      createdAt: daysAgo(3),
    },
  ];

  return { users, entries, complaints, session: { userId: null } };
}

let db: DB = (() => {
  if (typeof window === "undefined") return seed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DB;
  } catch {}
  const fresh = seed();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {}
  return fresh;
})();

const listeners = new Set<() => void>();
function emit() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {}
  listeners.forEach((l) => l());
}

export const store = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get() {
    return db;
  },
  login(email: string): User | null {
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    db = { ...db, session: { userId: user.id } };
    emit();
    return user;
  },
  logout() {
    db = { ...db, session: { userId: null } };
    emit();
  },
  currentUser(): User | null {
    if (!db.session.userId) return null;
    return db.users.find((u) => u.id === db.session.userId) ?? null;
  },
  addEntry(e: Omit<DailyEntry, "id">) {
    const entry: DailyEntry = { ...e, id: `e${Date.now()}` };
    db = { ...db, entries: [entry, ...db.entries] };
    emit();
    return entry;
  },
  addComplaint(c: Omit<Complaint, "id" | "number" | "status" | "createdAt">) {
    const number = (db.complaints[0]?.number ?? 240) + 1;
    const complaint: Complaint = {
      ...c,
      id: `c${Date.now()}`,
      number,
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    db = { ...db, complaints: [complaint, ...db.complaints] };
    emit();
    return complaint;
  },
  updateComplaintStatus(id: string, status: ComplaintStatus) {
    db = {
      ...db,
      complaints: db.complaints.map((c) => (c.id === id ? { ...c, status } : c)),
    };
    emit();
  },
  toggleUser(id: string) {
    db = {
      ...db,
      users: db.users.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u,
      ),
    };
    emit();
  },
};

// Initial snapshot used for SSR + first client render (no localStorage read).
// After mount, useEffect swaps in the real (possibly localStorage-backed) db
// and subscribes for updates — avoiding hydration mismatches.
const initialSnapshot: DB = seed();

export function useDB(): DB {
  const [snap, setSnap] = useState<DB>(initialSnapshot);
  useEffect(() => {
    setSnap(store.get());
    const unsub = store.subscribe(() => setSnap(store.get()));
    return () => {
      unsub();
    };
  }, []);
  return snap;
}

// Backwards-compat: select with a stable snapshot. Caller is responsible for
// memoizing derived data — wrap selector results in useMemo when needed.
export function useStore<T>(selector: (d: DB) => T): T {
  const db = useDB();
  return selector(db);
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
