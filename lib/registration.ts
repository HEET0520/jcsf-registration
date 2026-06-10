export interface FamilyMember {
  name: string;
  whatsapp: string;
  age: string;
  tshirtSize: string;
}

export interface RegistrationPayload {
  // Personal
  federation: string;
  memberName: string;
  membershipNumber: string;
  email: string;
  whatsapp: string;
  alternateNumber: string;
  address: string;
  city: string;

  // Family
  familyJoining: boolean;
  familyMembers: FamilyMember[];

  // Travel
  travelMode: string;
  trainArrivalStatus: string;
  trainArrivalNumber: string;
  trainArrivalCoach: string;
  trainReturnStatus: string;
  trainReturnNumber: string;
  trainReturnCoach: string;

  // Payment
  totalAmount: number;
  // screenshot sent as FormData file
}

export function calculateAmount(familyCount: number): number {
  return 3000 + familyCount * 2000;
}

export function validatePayload(payload: Partial<RegistrationPayload>): string | null {
  if (!payload.federation) return "Please select your federation.";
  if (!payload.memberName?.trim()) return "Member name is required.";
  if (!payload.email?.trim()) return "Email is required.";
  if (!payload.whatsapp?.trim()) return "WhatsApp number is required.";
  if (!payload.city?.trim()) return "City is required.";
  if (!payload.travelMode) return "Please select a travel mode.";

  if (payload.familyJoining && payload.familyMembers?.length) {
    for (let i = 0; i < payload.familyMembers.length; i++) {
      const m = payload.familyMembers[i];
      if (!m.name?.trim()) return `Family member ${i + 1} name is required.`;
    }
  }

  return null;
}
