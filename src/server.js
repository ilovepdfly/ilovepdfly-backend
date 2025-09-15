const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

// ✅ Initialize Firebase using environment variable
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
    ),
  });
}

const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// --- routes ---
app.get("/", (req, res) => {
  res.send("iLovePDFly Backend running ✅");
});

// Import your WebAuthn handlers
const webauthn = require("./webauthn");

// WebAuthn routes
app.post("/webauthn/register/options", webauthn.registerOptionsHandler);
app.post("/webauthn/register/complete", webauthn.registerCompleteHandler);
app.post("/webauthn/login/options", webauthn.loginOptionsHandler);
app.post("/webauthn/login/complete", webauthn.loginCompleteHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
