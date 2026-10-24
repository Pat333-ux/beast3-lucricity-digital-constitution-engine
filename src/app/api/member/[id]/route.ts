import { NextResponse } from "next/server";
import { z } from "zod";

const updateMemberSchema = z.object({
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["member", "administrator", "auditor"]).optional(),
  location: z
    .object({
      state: z.string().optional(),
      county: z.string().optional(),
      city: z.string().optional(),
      zipCode: z.string().optional(),
    })
    .optional(),
  householdSize: z.number().int().positive().optional(),
  annualIncome: z.number().nonnegative().optional(),
  veteranStatus: z.boolean().optional(),
  disabilityStatus: z.boolean().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Simulated lookup logic (replace with dbService / lib/db call)
    const mockMember = {
      id,
      email: "member@lucricity.org",
      fullName: "Ecosystem Member",
      role: "member",
      location: {
        state: "IN",
        county: "Vigo",
        city: "Terre Haute",
        zipCode: "47807",
      },
      householdSize: 3,
      annualIncome: 38000,
      veteranStatus: false,
      disabilityStatus: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ member: mockMember });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch member details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = updateMemberSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updatedMember = {
      id,
      ...validation.data,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update member record" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    return NextResponse.json({
      message: `Member record ${id} removed successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete member record" },
      { status: 500 }
    );
  }
}
