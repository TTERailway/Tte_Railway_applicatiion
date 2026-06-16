import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const keyStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
    if (!keyStr.startsWith("{")) {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_KEY in .env does not appear to be a valid JSON string.\n" +
        "Please provide the full stringified content of your Firebase Service Account private key JSON file (not just the email address)."
      );
    }
    const serviceAccount = JSON.parse(keyStr);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin:\n", error instanceof Error ? error.message : error);
  }
} else {
  console.log(
    "Firebase Admin not initialized. Provide FIREBASE_SERVICE_ACCOUNT_KEY in .env.",
  );
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
