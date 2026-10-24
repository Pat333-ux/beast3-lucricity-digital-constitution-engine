import { NextResponse } from "next/server";
import { z } from "zod";

const assessmentInputSchema = z.object({
  memberId: z.string().min(1, { message: "Member ID is required" }),
  householdIncome: z.number().nonnegative({ message: "Household income must be non-negative" }),
  householdMembers: z.number().int().positive({ message: "Household members must be at least 1" }),
  employmentStatus: z.enum(["employed", "unemployed", "self-employed", "retired", "student"]),
  housingStatus: z.enum(["own", "rent", "unhoused", "temporary"]),
  utilityAssistanceNeeded: z.boolean(),
  foodAssistanceNeeded: z.boolean(),
  healthcareAssistanceNeeded: z.boolean(),
  educationAssistanceNeeded: z.boolean(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = assessmentInputSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid assessment data", details: validation.error.format() },
        { status: 400 }
      );
    }

    const assessment = validation.data;
    const now = new Date().toISOString();

    // Basic calculation for eligibility score and matched programs
    let score = 50;
    if (assessment.householdIncome < 35000) score += 25;
    if (assessment.housingStatus === "unhoused" || assessment.housingStatus === "temporary") score += 15;
    if (assessment.utilityAssistanceNeeded || assessment.foodAssistanceNeeded) score += 10;

    const matchedProgramIds = ["fed_snap_01", "ind_liheap_01", "loc_vigo_food_01"];

    const assessmentResult = {
      id: `asm_${Date.now()}`,
      memberId: assessment.memberId,
      eligibleProgramIds: matchedProgramIds,
      calculatedAt: now,
      overallEligibilityScore: Math.min(score, 100),
    };

    return NextResponse.json(
      {
        message: "Assessment processed successfully",
        assessment: assessmentResult,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process assessment" },
      { status: 500 }
    );
  }
}
