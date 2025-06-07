import { createUser } from "@/backend/controller/user/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse, next: any) {
  return await createUser(req, res, next);
}