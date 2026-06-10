# JCSF Registration — Setup Guide

## Step 1: Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable APIs:
   - **Google Sheets API**
   - **Google Drive API**
4. Go to **IAM & Admin → Service Accounts**
5. Create a service account → Download JSON key
6. Copy from the JSON:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

---

## Step 2: Google Sheets

1. Create a new Google Spreadsheet
2. Name it: **JCSF Registrations**
3. Rename the default sheet to **Members**
4. Add 3 more sheets: **FamilyMembers**, **Travel**, **Payments**
5. Share the spreadsheet with your service account email (Editor access)
6. Copy the Spreadsheet ID from the URL and set `GOOGLE_SHEET_ID`

### Sheet Headers (add manually or they'll be set on first submission)

**Members** (Row 1):
```
RegistrationID | Timestamp | Federation | MemberName | MembershipNumber | Email | Whatsapp | AlternateNumber | Address | City
```

**FamilyMembers** (Row 1):
```
RegistrationID | Name | Whatsapp | Age | TshirtSize
```

**Travel** (Row 1):
```
RegistrationID | TravelMode | ArrivalStatus | ArrivalTrain | ArrivalCoach | ReturnStatus | ReturnTrain | ReturnCoach
```

**Payments** (Row 1):
```
RegistrationID | Amount | ScreenshotURL
```

---

## Step 3: Google Drive Folder

1. Create a folder in Google Drive: **JCSF Registration Screenshots**
2. Share the folder with your service account email (Editor access)
3. Copy the Folder ID from the URL and set `GOOGLE_DRIVE_FOLDER_ID`

---

## Step 4: Environment Variables

Edit `.env.local`:

```env
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1A2B3C4D5E6F7G8H9I
```

> **Important**: The private key must have `\n` escapes preserved. If copying from JSON, replace actual newlines with `\n`.

---

## Step 5: Add QR Code

1. Generate a UPI QR code for `jcsf@upi` using any UPI QR generator
2. Save as `public/qr.png`
3. In `components/PaymentDetails.tsx`, replace the placeholder emoji block with:
   ```tsx
   <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain rounded-xl" />
   ```

---

## Step 6: Run Locally

```bash
cd jcsf-registration
npm install
npm run dev
```

Open: http://localhost:3000

---

## Step 7: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
# Add all 4 variables from .env.local
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Registration ID Format

`JCSF-2026-0001`, `JCSF-2026-0002`, etc.
Auto-incremented based on existing rows in the Members sheet.
