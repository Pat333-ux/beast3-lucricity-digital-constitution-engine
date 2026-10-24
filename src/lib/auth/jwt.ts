import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_fallback_jwt_secret_change_in_production";

export interface JWTPayload {
  id: string;
  email: string;
  role: "member" | "administrator" | "auditor";
  [key: string]: any;
}

export const tokenUtils = {
  signToken(payload: JWTPayload, expiresIn: string = "8h"): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
  },

  verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error("JWT Verification failed:", error);
      return null;
    }
  },
};
