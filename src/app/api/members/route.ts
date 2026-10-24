import { NextResponse } from "next/server";
import { z } from "zod";

const memberQuerySchema = z.object({
  role: z.enum(["member", "administrator", "auditor"]).optional(),
  limit: z.coerce.number().positive().default(50),
  page: z.coerce.number().positive().default(1),
});

const createMemberSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  role: z.enum(["member", "administrator", "auditor"]).default("member"),
  location: z.object({
    state: z.string().default("IN"),
    county: z.string().default("Vigo"),
    city: z.string().default("Terre Haute"),
    zipCode: z.string().default("47807"),
  }),
  householdSize: z.number().int().positive().default(1),
  annualIncome: z.number().nonnegative().default(0),
  veteranStatus: z.boolean().default(false),
  disabilityStatus: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validation = memberQuerySchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    // Placeholder mock data response
    const mockMembers = [
      {
        id: "mbr_101",
        email: "member1@lucricity.org",
        fullName: "Pat Tarwater",
        role: "administrator",
        location: { state: "IN", county: "Vigo", city: "Terre Haute", zipCode: "47807" },
        householdSize: 2,
        annualIncome: 45000,
        veteranStatus: false,
        disabilityStatus: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      members: mockMembers,
      pagination: {
        total: mockMembers.length,
        page: validation.data.page,
        limit: validation.data.limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createMemberSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newMember = {
      id: `mbr_${Date.now()}`,
      ...validation.data,
      createdAt: now,
      updatedAt: now,
    };

    return NextResponse.json({ member: newMember }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create member profile" },
      { status: 500 }
    );
  }
}
