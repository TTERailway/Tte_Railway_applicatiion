import { Router } from "express";
import { adminDb } from "../config/firebase.js";

export const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all TTE Entries
router.get("/entries", async (req, res, next) => {
  try {
    if (!adminDb) {
      return res
        .status(503)
        .json({ error: "Firebase Admin database not initialized" });
    }
    const snap = await adminDb
      .collection("entries")
      .orderBy("date", "desc")
      .get();
    const entries = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// Get all complaints
router.get("/complaints", async (req, res, next) => {
  try {
    if (!adminDb) {
      return res
        .status(503)
        .json({ error: "Firebase Admin database not initialized" });
    }
    const snap = await adminDb
      .collection("complaints")
      .orderBy("number", "desc")
      .get();
    const complaints = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(complaints);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/users", async (req, res, next) => {
  try {
    if (!adminDb) {
      return res
        .status(503)
        .json({ error: "Firebase Admin database not initialized" });
    }
    const snap = await adminDb.collection("users").get();
    const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    users.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Update user status (active/disabled)
router.patch("/users/:id/status", async (req, res, next) => {
  try {
    if (!adminDb) {
      return res
        .status(503)
        .json({ error: "Firebase Admin database not initialized" });
    }
    const { id } = req.params;
    const { status } = req.body;
    if (status !== "active" && status !== "disabled") {
      return res.status(400).json({ error: "Invalid status value" });
    }
    await adminDb.collection("users").doc(id).update({ status });
    res.json({ success: true, id, status });
  } catch (error) {
    next(error);
  }
});
