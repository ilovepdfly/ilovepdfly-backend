const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

// ✅ initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS))
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

// import your WebAuthn handlers here
const webauthn = require("./webauthn");

// example usage
app.post("/webauthn/register/options", webauthn.registerOptionsHandler);
app.post("/webauthn/register/complete", webauthn.registerCompleteHandler);
app.post("/webauthn/login/options", webauthn.loginOptionsHandler);
app.post("/webauthn/login/complete", webauthn.loginCompleteHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
