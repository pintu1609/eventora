import { connectToDatabase } from "@/backend/lib/db";
import { checkGuest } from "@/backend/service/scanqr/scanqr";
import { checkinginGuest } from "@/backend/service/scanqr/scanqr";
import { NextRequest, NextResponse } from "next/server";

export const scanQr = async (req: NextRequest, res: NextResponse, next: any) => {

    try{
        await connectToDatabase();
        const body = await req.json();
        console.log("🚀 ~ scanQr ~ body:", body)
    const result = await checkGuest(body.qrCode);
    return NextResponse.json( { status: 201 , message: result.message || "Guest found successfully", data: result}); 
    }catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
  
};



export const checkinGuest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try {
        const body = await req.json();


        const result = await checkinginGuest(body.id);
        return NextResponse.json( { status: 201, message: "Guest checked in successfully", data: result});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
};