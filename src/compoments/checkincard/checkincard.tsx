"use client";
import React, { use, useEffect, useState } from "react";
import { useEventRegistration } from "@/hooks/registration";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import toast from "react-hot-toast";
import { usescan } from "@/hooks/scanqr";

interface Guest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  // image?: {
  //   _id: string;
  //   name: string;
  //   data: {
  //     type: string;
  //     data: number[];
  //   };
  // };
  status: string;
  hasEntered: boolean;
  // imageUrl?: string;

}

export default function CheckinCard({ guestId, onClose,loading, guest  }: { guestId: string; onClose: () => void; loading: boolean; guest:Guest }) {

  const { checkinGuest, loadingCheckinGuest } = usescan();

  const handleAction=async(guestId:string)=>{
  const res =  await checkinGuest (guestId,);
  if (res.status === 201)

    onClose();
  } 




  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {loading ? (
          <div className="flex items-center justify-center">
            <ClipLoader color="#36d7b7" size={100} />
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Guest Details</h3>
            
            <p><strong>Name:</strong> {guest?.name}</p>
            <p><strong>Email:</strong> {guest?.email}</p>
            <p><strong>Phone:</strong> {guest?.phone}</p>
            <p><strong>Status:</strong> {guest?.status}</p>
            <p><strong>Has Entered:</strong> {guest?.hasEntered ? "Yes" : "No"}</p>
            {/* <div>
              <Image
                src={guest?.imageUrl || "/placeholder.jpg"}
                alt={guest?.name || "Guest"}
                width={256}
                height={256}
                unoptimized
                className="w-full h-64 rounded-md mx-auto my-4 "
                quality={100}

              />
            </div> */}

            <div className="flex justify-between mt-6">
                            {!guest?.hasEntered  && (

              <button
                onClick={() => handleAction(guest?._id)}
                disabled={loadingCheckinGuest}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Checkin
              </button>
           )} 
              {/* {guest?.status !== "cancel" && (
                
             
              <button
                onClick={() => handleAction("cancel")}
                disabled={loadingUpdateStatus}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cancel
              </button>
               )} */}
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
