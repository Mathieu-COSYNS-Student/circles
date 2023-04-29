import { credential } from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";

export { firestore } from "firebase-admin";

if (getApps().length < 1)
  initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
