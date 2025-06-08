import {
  apporveGuest,
  deleteGuest,
  fetchallGuest,
  Guest,
} from "@/backend/controller/guest/guest";
import { verifyToken } from "@/backend/lib/middleware/authorization";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return await Guest(req);
}

export async function GET(req: NextRequest) {
  const auth = await verifyToken(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await fetchallGuest();
}

export async function PUT(req: NextRequest) {
  const auth = await verifyToken(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await apporveGuest(req);
}
export async function DELETE(req: NextRequest) {
  const auth = await verifyToken(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;
  return await deleteGuest(req);
}
