import { findOne, findOneAndUpdate } from "@/backend/dal/dal";
import { Guest } from "@/backend/model/guest/guest";

export const checkGuest = async (qrcode: any) => {
    console.log("🚀 ~ checkGuest ~ qrcode:", qrcode)
    const guest = await findOne(Guest, { qrToken: qrcode });
    console.log("🚀 ~ checkGuest ~ guest:", guest)
    if (!guest) {
    return { status: 404, message: "Guest not found" };
  }

  if (guest.hasEntered) {
    return { status: 200, message: "Guest already entered", guest };
  }

  return { status: 201, message: "Guest found successfully", guest };
};



export const checkinginGuest = async (id: any) => {
    const guest = await findOneAndUpdate(Guest, { _id: id }, { hasEntered: true });
    if (!guest) {"Guest not found"};
    return guest;
};