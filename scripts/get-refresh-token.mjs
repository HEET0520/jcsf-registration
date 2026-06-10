/**
 * ONE-TIME SCRIPT — Run this once locally to get your Google OAuth refresh token.
 *
 * Usage:
 *   node scripts/get-refresh-token.mjs
 *
 * Prerequisites:
 *   1. In Google Cloud Console (console.cloud.google.com):
 *      - Go to "APIs & Services" → "Credentials"
 *      - Click "+ Create Credentials" → "OAuth client ID"
 *      - Application type: "Desktop app"  (important — not Web)
 *      - Name it "JCSF Drive Uploader" → Create
 *      - Copy the Client ID and Client Secret
 *
 *   2. Add them to .env.local:
 *      GOOGLE_OAUTH_CLIENT_ID=your_client_id_here
 *      GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret_here
 *
 *   3. Run this script:
 *      node scripts/get-refresh-token.mjs
 *
 *   4. Open the URL it prints → sign in with the Google account
 *      that OWNS your Drive folder → allow access → copy the code
 *
 *   5. Paste the code back in the terminal → it prints your refresh token
 *
 *   6. Add to .env.local:
 *      GOOGLE_OAUTH_REFRESH_TOKEN=your_refresh_token_here
 *
 * That's it — you never need to run this again unless you revoke access.
 */

import { createInterface } from "readline";
import { google } from "googleapis";

// ─── Read env vars ─────────────────────────────────────────────────────────────
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

let clientId = "";
let clientSecret = "";

try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...rest] = line.split("=");
    const value = rest.join("=").trim().replace(/^"|"$/g, "");
    if (key.trim() === "GOOGLE_OAUTH_CLIENT_ID") clientId = value;
    if (key.trim() === "GOOGLE_OAUTH_CLIENT_SECRET") clientSecret = value;
  }
} catch {
  // ignore — will prompt
}

if (!clientId || clientId === "your_client_id_here") {
  console.error("\n❌  GOOGLE_OAUTH_CLIENT_ID not found in .env.local");
  console.error("   Add it first, then re-run this script.\n");
  process.exit(1);
}
if (!clientSecret || clientSecret === "your_client_secret_here") {
  console.error("\n❌  GOOGLE_OAUTH_CLIENT_SECRET not found in .env.local");
  console.error("   Add it first, then re-run this script.\n");
  process.exit(1);
}

// ─── OAuth2 flow ───────────────────────────────────────────────────────────────
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  "urn:ietf:wg:oauth:2.0:oob"
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/drive"],
  prompt: "consent", // forces refresh_token to be returned
});

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  JCSF — Google Drive OAuth Setup");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("1. Open this URL in your browser:\n");
console.log("   " + authUrl);
console.log("\n2. Sign in with the Google account that owns your Drive folder.");
console.log("3. Allow the requested permissions.");
console.log("4. Copy the authorization code shown on screen.\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Paste the authorization code here: ", async (code) => {
  rl.close();
  try {
    const { tokens } = await oauth2Client.getToken(code.trim());

    if (!tokens.refresh_token) {
      console.error(
        "\n❌  No refresh_token returned. This usually means access was already granted.\n" +
        "   Go to https://myaccount.google.com/permissions, revoke access for your app,\n" +
        "   then run this script again.\n"
      );
      process.exit(1);
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  ✅  Success! Add this to your .env.local:\n");
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (err) {
    console.error("\n❌  Failed to exchange code for token:", err.message);
    process.exit(1);
  }
});
