import { NextResponse } from "next/server";
import { z } from "zod";

const eligibilityQuerySchema = z.object({
  memberId: z.string().min(1, { message: "Member ID parameter is required" }),
  opportunityId: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validation = eligibilityQuerySchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid eligibility query parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { memberId, opportunityId } = validation.data;

    // Simulated entitlement analysis & eligibility verification rules engine
    const eligibilityResults = [
      {
        opportunityId: opportunityId || "opp_snap_vigo_47807",
        opportunityTitle: "Vigo County Supplemental Nutrition Assistance Program (SNAP)",
        isEligible: true,
        matchConfidence: 0.94,
        tierLevel: "Level 1 Priority",
        criteriaMet: [
          "Residency verified in Vigo County, IN",
          "Household income below 130% Federal Poverty Level",
        ],
        criteriaPending: ["Proof of employment status / qualification waiver"],
      },
      {
        opportunityId: "opp_liheap_in_2026",
        opportunityTitle: "Indiana Low-Income Home Energy Assistance Program (LIHEAP)",
        isEligible: true,
        matchConfidence: 0.88,
        tierLevel: "Level 2 Standard",
        criteriaMet: [
          "Utility burden threshold exceeded",
          "Indiana state residency confirmed",
        ],
        criteriaPending: [],
      },
    ];

    return NextResponse.json({
      memberId,
      verifiedAt: new Date().toISOString(),
      evaluations: eligibilityResults,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to perform eligibility calculation" },
      { status: 500 }
    );
  }
}
