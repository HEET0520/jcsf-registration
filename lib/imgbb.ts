/**
 * Upload a payment screenshot to ImgBB (free image hosting).
 * Returns a public URL stored in the Google Sheets Payments tab.
 *
 * Setup (2 min):
 *  1. Go to https://imgbb.com → Sign up (free)
 *  2. Go to https://api.imgbb.com → click "Get API key"
 *  3. Add IMGBB_API_KEY=your_key to .env.local
 */
export async function uploadScreenshot(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  const apiKey = process.env.IMGBB_API_KEY;

  if (!apiKey || apiKey === "your_imgbb_api_key_here") {
    throw new Error(
      "IMGBB_API_KEY is not configured. Get a free key at https://api.imgbb.com"
    );
  }

  const base64Image = fileBuffer.toString("base64");

  const body = new URLSearchParams();
  body.append("key", apiKey);
  body.append("image", base64Image);
  body.append("name", fileName.replace(/\.[^.]+$/, ""));

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`ImgBB upload failed (${response.status}): ${text}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(`ImgBB error: ${JSON.stringify(json.error ?? json)}`);
  }

  // url_viewer = hosted page with the image; url = direct image link
  return (json.data?.url_viewer ?? json.data?.url) as string;
}
