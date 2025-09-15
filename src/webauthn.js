const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} = require("@simplewebauthn/server");
const admin = require("firebase-admin");
const { randomBytes } = require("crypto");

const rpID = process.env.RP_ID || "ilovepdfly.com";
const expectedOrigin = process.env.EXPECTED_ORIGIN || `https://${rpID}`;

// helper functions
function base64ToBuffer(base64) {
  return Buffer.from(base64, "base64url");
}
function bufferToBase64(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

function userDocRefByEmail(email) {
  const db = admin.firestore(); // ✅ only call firestore() AFTER Firebase is initialized
  return db.collection("users").doc(email.toLowerCase());
}

// export handlers
module.exports = {
  registerOptionsHandler: async function (req, res) {
    const db = admin.firestore();
    // ... your code for register options here
  },

  registerCompleteHandler: async function (req, res) {
    const db = admin.firestore();
    // ... your code for register complete here
  },

  loginOptionsHandler: async function (req, res) {
    const db = admin.firestore();
    // ... your code for login options here
  },

  loginCompleteHandler: async function (req, res) {
    const db = admin.firestore();
    // ... your code for login complete here
  }
};
