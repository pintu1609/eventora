"use client";
import React, { useEffect, useState } from "react";
import { useEventRegistration } from "@/hooks/registration";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

interface Guest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image?: {
    _id: string;
    name: string;
    data: {
      type: string;
      data: number[];
    };
  };
  status: string;
  hasEntered: boolean;
  imageUrl?: string;

}

export default function GuestCard({ guestId, onClose, onStatusChange, }: { guestId: string; onClose: () => void; onStatusChange: (status: string) => void; }) {
  const { fetchGuestBYID, loadingFetchGuestListByID, updateGuestStatus, loadingUpdateStatus } = useEventRegistration();
  const [guest, setGuest] = useState<Guest | null>(null);

  const handleAction = async (status: string) => {
    const res = await updateGuestStatus(guestId, status);
    if (res.status === 201)
      onStatusChange(status); // ✅ update parent list before closing

    onClose();
  }


  useEffect(() => {
    const loadGuests = async () => {
      const res = await fetchGuestBYID(guestId);
      console.log("✅ Response from fetchGuestBYID:", res);

      if (res && res.data) {
        const guestData = res.data;
        console.log("🚀 ~ loadGuests ~ guestData:", guestData)

        // ✅ Check if image binary data exists
        if (
          guestData.image &&
          guestData.image.data &&
          guestData.image.data.data &&
          Array.isArray(guestData.image.data.data)
        ) {
          try {
            const byteArray = new Uint8Array(guestData.image.data.data);
            const blob = new Blob([byteArray], { type: "image/jpeg" });
            const reader = new FileReader();

            reader.onloadend = () => {
              guestData.imageUrl = reader.result as string;
              setGuest(guestData); // ✅ only set guest after reader finishes
            };

            reader.readAsDataURL(blob);
          } catch (error) {
            console.error("❌ Error converting image to base64", error);
            setGuest(guestData); // still set guest without image
          }


        } else {
          setGuest(guestData);
        }
      }
    };

    loadGuests();

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [guestId]);

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {loadingFetchGuestListByID ? (
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
            <div>
              <Image
                src={guest?.imageUrl || "/placeholder.jpg"}
                alt={guest?.name || "Guest"}
                width={256}
                height={256}
                unoptimized
                className="w-full h-64 rounded-md mx-auto my-4 "
                quality={100}

              />
            </div>

            <div className="flex justify-between mt-6">
              {guest?.status !== "approved" && (

                <button
                  onClick={() => handleAction("approved")}
                  disabled={loadingUpdateStatus}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
              )}
              {guest?.status !== "cancel" && (


                <button
                  onClick={() => handleAction("cancel")}
                  disabled={loadingUpdateStatus}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              )}
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
