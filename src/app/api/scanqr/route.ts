import { scanQr } from "@/backend/controller/scanqr/scanqr";
import { verifyToken } from "@/backend/lib/middleware/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const auth = await verifyToken(req,["admin"]);
  if (auth instanceof NextResponse) return auth;
    return await scanQr (req);
}

