import { sendEmail } from "@/app/utls";
import { create, find, findByID, findOneAndDelete, findOneAndUpdate } from "@/backend/dal/dal";
import { Guest } from "@/backend/model/guest/guest";
import QRCode from "qrcode";

import {Image} from "@/backend/model/image/image"

interface interfaceGuest {
  name: string;
  email: string;
  phone: string;
  status: string;
  qrToken: string;
  hasEntered: boolean;
  image: string;
}
export const createGuest = async (guest: interfaceGuest) => {
        const existingGuest = await findOneAndUpdate(Guest, { email: guest.email }, guest);
        if (existingGuest) {
           throw new Error("Guest already exist");
        }
    
    const newGuest = await create(Guest, guest);
    return newGuest;
};

export const findAllGuest = async () => {
    const guest = await find( Guest, {} );
    return guest;
};

export const apporveguest = async (id: string, status: string) => {
console.log("🚀 ~ apporveguest ~ status:", status)
console.log("🚀 ~ apporveguest ~ id:", id)

  if (status === "approved"){
    // 1. Generate QR token
    const qrTokens = crypto.randomUUID();

  // 2. Generate QR code image data URL
  // const qrCodeDataUrl = await QRCode.toDataURL(qrTokens);
  const qrBuffer = await QRCode.toBuffer(qrTokens);


  // 3. Update guest with status, token, and mark as not entered
  const guest = await findOneAndUpdate(
    Guest,
    { _id: id },
    { status: "approved", qrToken: qrTokens }
  );

  if (!guest) throw new Error("Guest not found");
  const htmlBody = `
    <p>Hello ${guest.name},</p>
    <p>Thank you for registering. Please find your unique QR code below:</p>
    <p>Please show this attached QR code at the entrance.</p>
    <p>Best regards,</p>
    <p>Event Management Team</p>
  `;
  await sendEmail({
    to: guest.email,
    subject: "Guest QR code",
    desc: htmlBody,
    attachment: qrBuffer
  });

  return guest

}else{  
  const guest = await findOneAndUpdate(
    Guest,
    { _id: id },
    { status: "cancel" }
  )
    if (!guest) throw new Error("Guest not found");

  return guest
}

};

export const deleteGuests = async (id: string) => {
    const guest = await findOneAndDelete(Guest, { _id: id });
    return guest;
};

export const checkGuest = async (id: string) => {
    const guest = await findByID(Guest, id); 
    if (!guest) {return {}};

    const image = await findByID(Image, guest.image);
    const guestWithImage = {
    ...guest.toObject?.() || guest, // ensures it's a plain object
    image,
  };

  return guestWithImage;
};