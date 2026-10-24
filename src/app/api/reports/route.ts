import { NextResponse } from "next/server";
import { z } from "zod";

const reportQuerySchema = z.object({
  reportType: z.enum(["benefits_distribution", "compliance_audit", "wellbeing_summary"]).default("benefits_distribution"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validation = reportQuerySchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid report query parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { reportType } = validation.data;

    const mockReportData = {
      reportType,
      generatedAt: new Date().toISOString(),
      summary: {
        totalBenefitsDistributedUSD: 148500.0,
        activeBeneficiariesCount: 342,
        auditedTransactionsCount: 1204,
        complianceScorePct: 99.8,
      },
      regionalBreakdown: [
        { county: "Vigo", city: "Terre Haute", totalAllocatedUSD: 98200.0 },
        { county: "Clay", city: "Brazil", totalAllocatedUSD: 29500.0 },
        { county: "Sullivan", city: "Sullivan", totalAllocatedUSD: 20800.0 },
      ],
    };

    return NextResponse.json({ report: mockReportData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate report data" },
      { status: 500 }
    );
  }
}
