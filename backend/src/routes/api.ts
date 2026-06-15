import { Router } from "express";

export const router = Router();

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Example route for TTE Entries placeholder
router.get("/entries", (req, res) => {
  res.json({ message: "Get all entries (endpoint placeholder)" });
});

// Example route for Complaints placeholder
router.get("/complaints", (req, res) => {
  res.json({ message: "Get all complaints (endpoint placeholder)" });
});
