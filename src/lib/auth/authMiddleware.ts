import { NextResponse } from "next/server";
import { tokenUtils, JWTPayload } from "./jwt";

export function authenticateRequest(request: Request): {
  user: JWTPayload | null;
  errorResponse: NextResponse | null;
} {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized: Missing or malformed authorization token" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split(" ")[1];
  const decoded = tokenUtils.verifyToken(token);

  if (!decoded) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      ),
    };
  }

  return {
    user: decoded,
    errorResponse: null,
  };
}

export function requireRole(allowedRoles: Array<"member" | "administrator" | "auditor">) {
  return function (user: JWTPayload): boolean {
    return allowedRoles.includes(user.role);
  };
}
