import { NextRequest, NextResponse } from "next/server";
import {
  getNextRegistrationId,
  appendMemberRow,
  appendFamilyMembers,
  appendTravelRow,
  appendPaymentRow,
} from "@/lib/googleSheets";
import { uploadScreenshotToDrive } from "@/lib/googleDrive";
import { validatePayload } from "@/lib/registration";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Parse JSON fields
    const federation = formData.get("federation") as string;
    const memberName = formData.get("memberName") as string;
    const membershipNumber = formData.get("membershipNumber") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const alternateNumber = formData.get("alternateNumber") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;

    const familyJoining = formData.get("familyJoining") === "true";
    const familyMembersRaw = formData.get("familyMembers") as string;
    const familyMembers = familyMembersRaw ? JSON.parse(familyMembersRaw) : [];

    const travelMode = formData.get("travelMode") as string;
    const trainArrivalStatus = formData.get("trainArrivalStatus") as string || "";
    const trainArrivalNumber = formData.get("trainArrivalNumber") as string || "";
    const trainArrivalCoach = formData.get("trainArrivalCoach") as string || "";
    const trainReturnStatus = formData.get("trainReturnStatus") as string || "";
    const trainReturnNumber = formData.get("trainReturnNumber") as string || "";
    const trainReturnCoach = formData.get("trainReturnCoach") as string || "";

    const totalAmount = Number(formData.get("totalAmount") || 0);

    // Validate
    const validationError = validatePayload({
      federation,
      memberName,
      email,
      whatsapp,
      city,
      travelMode,
      familyJoining,
      familyMembers,
    });

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Handle screenshot upload — fault-tolerant: Drive failure never blocks registration
    const screenshotFile = formData.get("screenshot") as File | null;
    let screenshotUrl = "";

    if (screenshotFile && screenshotFile.size > 0) {
      try {
        const arrayBuffer = await screenshotFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const ext = screenshotFile.name.split(".").pop() || "jpg";
        const fileName = `payment_${Date.now()}.${ext}`;
        screenshotUrl = await uploadScreenshotToDrive(
          buffer,
          fileName,
          screenshotFile.type || "image/jpeg"
        );
      } catch (uploadErr: unknown) {
        // Log but don't block registration — screenshot URL will be empty
        const msg = uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
        console.error("Screenshot upload failed (registration still saved):", msg);
        screenshotUrl = `UPLOAD_FAILED: ${msg}`;
      }
    }

    // Generate Registration ID
    const registrationId = await getNextRegistrationId();
    const timestamp = new Date().toISOString();

    // Save to sheets
    await appendMemberRow({
      registrationId,
      timestamp,
      federation,
      memberName,
      membershipNumber: membershipNumber || "",
      email,
      whatsapp,
      alternateNumber: alternateNumber || "",
      address: address || "",
      city,
    });

    if (familyJoining && familyMembers.length > 0) {
      await appendFamilyMembers(registrationId, familyMembers);
    }

    await appendTravelRow({
      registrationId,
      travelMode,
      arrivalStatus: trainArrivalStatus,
      arrivalTrain: trainArrivalNumber,
      arrivalCoach: trainArrivalCoach,
      returnStatus: trainReturnStatus,
      returnTrain: trainReturnNumber,
      returnCoach: trainReturnCoach,
    });

    await appendPaymentRow({
      registrationId,
      amount: totalAmount,
      screenshotUrl,
    });

    return NextResponse.json({
      success: true,
      registrationId,
    });
  } catch (err: unknown) {
    console.error("Registration error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
