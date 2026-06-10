import { google } from "googleapis";
import { Readable } from "stream";

/**
 * Drive uploads use OAuth2 (your personal Google account) so that:
 *  - Files are owned by you, not the service account
 *  - Storage counts against your personal Drive quota (free 15 GB)
 *  - No Google Workspace required
 *
 * Required env vars:
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
 *   GOOGLE_DRIVE_FOLDER_ID   ← your personal Drive folder ID
 *
 * Run scripts/get-refresh-token.mjs once to generate the refresh token.
 */
function getDriveClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    "urn:ietf:wg:oauth:2.0:oob" // out-of-band (no redirect server needed)
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  });

  return google.drive({ version: "v3", auth: oauth2Client });
}

export async function uploadScreenshotToDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const drive = getDriveClient();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;

  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);

  let fileId: string;

  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: "id",
    });
    fileId = response.data.id!;
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code === 404) {
      throw new Error(
        `Drive folder not found (ID: ${folderId}). ` +
        `Check GOOGLE_DRIVE_FOLDER_ID in .env.local.`
      );
    }
    if (code === 401) {
      throw new Error(
        `Drive OAuth token invalid or expired. ` +
        `Re-run scripts/get-refresh-token.mjs to get a fresh token.`
      );
    }
    throw err;
  }

  // Make the file publicly viewable so the link works for anyone
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return `https://drive.google.com/file/d/${fileId}/view`;
}
