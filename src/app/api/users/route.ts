import { createUser } from "@/backend/controller/user/user";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await createUser(req);
}
