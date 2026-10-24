import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  fullName: z.string().min(2, { message: "Full name is required" }),
  householdSize: z.number().int().positive({ message: "Household size must be at least 1" }).default(1),
  annualIncome: z.number().nonnegative({ message: "Annual income must be a positive number" }).default(0),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, password, fullName, householdSize, annualIncome } = validation.data;

    // Hash user password for secure storage
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Construct new member payload
    const newMemberId = `mbr_${Date.now()}`;
    const newMember = {
      id: newMemberId,
      email,
      fullName,
      role: "member" as const,
      householdSize,
      annualIncome,
      createdAt: new Date().toISOString(),
    };

    const secret = process.env.JWT_SECRET || "default_fallback_jwt_secret_change_in_production";
    const token = jwt.sign(
      {
        id: newMember.id,
        email: newMember.email,
        role: newMember.role,
      },
      secret,
      { expiresIn: "8h" }
    );

    return NextResponse.json(
      {
        message: "Member account successfully created",
        token,
        member: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
