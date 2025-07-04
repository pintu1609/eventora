// lib/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Or use jose if preferred

const SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  userType: string;
  userId?: string;
  [key: string]: unknown; // safer than `any`
}

export const verifyToken = async (
  req: NextRequest,
  allowedRoles: string[] = []
) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as DecodedToken;
    if (allowedRoles.length && !allowedRoles.includes(decoded.userType)) {
      return NextResponse.json(
        { error: "Forbidden: insufficient role" },
        { status: 403 }
      );
    }
    return decoded; // You can use this decoded info (e.g., userId or role)
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};
