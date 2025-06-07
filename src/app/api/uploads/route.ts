// 

// /app/api/uploads/route.ts
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { uploadGuestSceenshot } from "@/lib/helper/multer"; // will resolve your CommonJS
import { promisify } from "util";

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert `Request` to Node stream
async function requestToStream(req: Request): Promise<Readable> {
  const reader = req.body?.getReader();
  const stream = new Readable({
    async read() {
      if (!reader) return this.push(null);
      const { done, value } = await reader.read();
      if (done) return this.push(null);
      this.push(value);
    },
  });
  return stream;
}

export async function POST(req: Request) {
  const nodeReq = (await requestToStream(req)) as any;
  const resMock: any = {
    statusCode: 200,
    headers: {},
    setHeader: (key: string, value: string) => {
      resMock.headers[key] = value;
    },
    end: (data: any) => {
      resMock.body = data;
    },
  };

  // Promisify the multer middleware
  const runMiddleware = promisify(uploadGuestSceenshot);

  try {
    await runMiddleware(nodeReq, resMock);
    return NextResponse.json({ message: "Upload successful" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
