import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Simulated lookup logic (replace with db/auth helper integration)
    if (email === "admin@lucricity.org" && password === "AdminPassword123!") {
      const secret = process.env.JWT_SECRET || "default_fallback_jwt_secret_change_in_production";
      
      const token = jwt.sign(
        {
          id: "admin-001",
          email: "admin@lucricity.org",
          role: "administrator",
        },
        secret,
        { expiresIn: "8h" }
      );

      return NextResponse.json({
        message: "Authentication successful",
        token,
        user: {
          id: "admin-001",
          email: "admin@lucricity.org",
          role: "administrator",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
