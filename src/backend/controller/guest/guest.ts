import { connectToDatabase } from "@/backend/lib/db";
import { apporveguest, checkGuest, createGuest, deleteGuests, findAllGuest } from "@/backend/service/guest/guest";
import { guestSchema, guestStatusValidationSchema } from "@/backend/validations/guest/guest";
import { NextRequest, NextResponse } from "next/server";

export const Guest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try {
        const body = await req.json();
        body.hasEntered = false
        body.status = "pending"
        body.qrToken = ""
        const guest = guestSchema.parse(body);
        const result = await createGuest( guest);
        return NextResponse.json({ status: 201 , message: "Guest created successfully", id: result._id });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
};



export const fetchallGuest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try { 
        const result = await findAllGuest( );
        return NextResponse.json({ status: 201, message: "Guest found successfully", data: result });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
};

export const apporveGuest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try {
        const body = await req.json();
        const guest = guestStatusValidationSchema.parse(body);


        const result = await apporveguest(guest.id, guest.status);
        if (result.status === "approved") {
            
            return NextResponse.json({ status: 201, message: "Guest approved successfully" });
        }else if (result.status === "cancel") {
            return NextResponse.json({ status: 201, message: "Guest canceled successfully" });
            
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
};


export const deleteGuest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try {
        const { id } = await req.json();
        const result = await deleteGuests(id);
        return NextResponse.json({ status: 201, message: "Guest deleted successfully" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
}

export const findGuest = async (req: NextRequest, res: NextResponse, next: any) => {
    await connectToDatabase();
    try {
        const { id } = await req.json();
        const result = await checkGuest(id);
        return NextResponse.json({ status: 201, message: "Guest found successfully", data: { id: result._id, name: result.name, email: result.email,phone: result.phone, doc: result.doc, status: result.status, hasEntered: result.hasEntered,image: result.image} });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            // handle unknown error type
        }
    }
    
}
// Check-in guest by QR token

// export const checkinGuest = async (req: NextRequest, res: NextResponse, next: any) => {
//     await connectToDatabase();
//     try { 
//         const result = await checkGuest( );
//         return NextResponse.json(result.id, { status: 201 });
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 400 });
//         } else {
//             // handle unknown error type
//         }
//     }
// };