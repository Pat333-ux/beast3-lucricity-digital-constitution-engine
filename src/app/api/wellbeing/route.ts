import { NextResponse } from "next/server";
import { z } from "zod";

const wellbeingRecordSchema = z.object({
  memberId: z.string().min(1, { message: "Member ID is required" }),
  financialStabilityScore: z.number().min(0).max(100),
  healthWellnessScore: z.number().min(0).max(100),
  housingSecurityScore: z.number().min(0).max(100),
  communityEngagementScore: z.number().min(0).max(100),
  notes: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get("memberId");

    if (!memberId) {
      return NextResponse.json(
        { error: "Query parameter 'memberId' is required" },
        { status: 400 }
      );
    }

    // Mock wellbeing index calculation
    const mockWellbeingData = {
      memberId,
      financialStabilityScore: 78,
      healthWellnessScore: 82,
      housingSecurityScore: 90,
      communityEngagementScore: 65,
      compositeScore: 78.75,
      evaluatedAt: new Date().toISOString(),
      trend: "improving",
    };

    return NextResponse.json({ wellbeing: mockWellbeingData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve wellbeing index data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = wellbeingRecordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid wellbeing data", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { financialStabilityScore, healthWellnessScore, housingSecurityScore, communityEngagementScore } =
      validation.data;

    const compositeScore =
      (financialStabilityScore +
        healthWellnessScore +
        housingSecurityScore +
        communityEngagementScore) /
      4;

    const record = {
      id: `wbi_${Date.now()}`,
      ...validation.data,
      compositeScore,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        message: "Wellbeing assessment recorded successfully",
        wellbeing: record,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record wellbeing metrics" },
      { status: 500 }
    );
  }
}
