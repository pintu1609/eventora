// import { connectionString } from "@/lib/database/db_connection"
import { connectToDatabase } from "@/backend/lib/db";
import { Image } from "@/backend/model/image/image";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        // await mongoose.connect(connectionString);
              await connectToDatabase();
        

        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({success:false})
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const newImage = new Image({
            name: file.name,
            data: buffer,
            contentType: file.type
        });
      const result =  await newImage.save();

        return NextResponse.json({ message: "Successfully Uploaded", success:true,data: result});
    }
    catch(error) {
        console.log(error)
        Response.json({ response: "Failed", success:false});
    }
}




export const GET = async () => {
    try {
                // await mongoose.connect(connectionString)
        await connectToDatabase()
        const images = await Image.find().select('name data contentType')
        return NextResponse.json({success:true, images})
    }
    catch(error){
        console.log(error)
        NextResponse.json({success:false, error: "Failed"})
    }
}