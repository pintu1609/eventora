import { apporveGuest, deleteGuest, fetchallGuest, Guest } from "@/backend/controller/guest/guest";
import { verifyToken } from "@/backend/lib/middleware/authorization";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse, next: any) {
  return await Guest(req, res, next);
}

export async function GET(req: NextRequest, res: NextResponse, next: any) {
  const auth = await verifyToken(req,["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await fetchallGuest (req, res, next);
}

export async function PUT(req: NextRequest, res: NextResponse, next: any) {
  const auth = await verifyToken(req,["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await apporveGuest(req, res, next);
}
export async function DELETE(req: NextRequest, res: NextResponse, next: any) {
  const auth = await verifyToken(req,["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await deleteGuest(req, res, next);
}