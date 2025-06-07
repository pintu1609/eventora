import {  findGuest } from "@/backend/controller/guest/guest";
import { verifyToken } from "@/backend/lib/middleware/authorization";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest, res: NextResponse, next: any) {
  const auth = await verifyToken(req,["admin"]);
  if (auth instanceof NextResponse) return auth;
    return await findGuest (req, res, next);
}
