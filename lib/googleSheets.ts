import { google } from "googleapis";

function getAuthClient() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(
    /\\n/g,
    "\n"
  );

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  return auth;
}

export async function getSheetsClient() {
  const auth = getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function getNextRegistrationId(): Promise<string> {
  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Members!A:A",
  });

  const rows = response.data.values || [];
  // rows[0] is header, so number of actual entries = rows.length - 1
  const count = Math.max(0, rows.length - 1);
  const nextNum = String(count + 1).padStart(4, "0");
  const year = new Date().getFullYear();
  return `JCSF-${year}-${nextNum}`;
}

export async function appendMemberRow(data: {
  registrationId: string;
  timestamp: string;
  federation: string;
  memberName: string;
  membershipNumber: string;
  email: string;
  whatsapp: string;
  alternateNumber: string;
  address: string;
  city: string;
}) {
  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Members!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.registrationId,
          data.timestamp,
          data.federation,
          data.memberName,
          data.membershipNumber,
          data.email,
          data.whatsapp,
          data.alternateNumber,
          data.address,
          data.city,
        ],
      ],
    },
  });
}

export async function appendFamilyMembers(
  registrationId: string,
  members: Array<{
    name: string;
    whatsapp: string;
    age: string;
    tshirtSize: string;
  }>
) {
  if (!members.length) return;

  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  const rows = members.map((m) => [
    registrationId,
    m.name,
    m.whatsapp,
    m.age,
    m.tshirtSize,
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "FamilyMembers!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}

export async function appendTravelRow(data: {
  registrationId: string;
  travelMode: string;
  arrivalStatus: string;
  arrivalTrain: string;
  arrivalCoach: string;
  returnStatus: string;
  returnTrain: string;
  returnCoach: string;
}) {
  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Travel!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.registrationId,
          data.travelMode,
          data.arrivalStatus,
          data.arrivalTrain,
          data.arrivalCoach,
          data.returnStatus,
          data.returnTrain,
          data.returnCoach,
        ],
      ],
    },
  });
}

export async function appendPaymentRow(data: {
  registrationId: string;
  amount: number;
  screenshotUrl: string;
}) {
  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Payments!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.registrationId, data.amount, data.screenshotUrl]],
    },
  });
}

export async function ensureSheetHeaders() {
  const sheets = await getSheetsClient();
  const sheetId = process.env.GOOGLE_SHEET_ID!;

  const headerSets = [
    {
      range: "Members!A1:J1",
      values: [
        [
          "RegistrationID",
          "Timestamp",
          "Federation",
          "MemberName",
          "MembershipNumber",
          "Email",
          "Whatsapp",
          "AlternateNumber",
          "Address",
          "City",
        ],
      ],
    },
    {
      range: "FamilyMembers!A1:E1",
      values: [["RegistrationID", "Name", "Whatsapp", "Age", "TshirtSize"]],
    },
    {
      range: "Travel!A1:H1",
      values: [
        [
          "RegistrationID",
          "TravelMode",
          "ArrivalStatus",
          "ArrivalTrain",
          "ArrivalCoach",
          "ReturnStatus",
          "ReturnTrain",
          "ReturnCoach",
        ],
      ],
    },
    {
      range: "Payments!A1:C1",
      values: [["RegistrationID", "Amount", "ScreenshotURL"]],
    },
  ];

  for (const h of headerSets) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: h.range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: h.values },
    });
  }
}
