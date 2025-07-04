"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
import { useScan } from "@/hooks/scanqr";

interface Guest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  hasEntered: boolean;

}

export default function CheckinCard({ onClose, loading, guest }: { onClose: () => void; loading: boolean; guest: Guest }) {

  const { checkinGuest, loadingCheckinGuest } = useScan();

  const handleAction = async (guestId: string) => {
    const res = await checkinGuest(guestId,);
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
            <div className="flex justify-between mt-6">
              {!guest?.hasEntered && (

                <button
                  onClick={() => handleAction(guest?._id)}
                  disabled={loadingCheckinGuest}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Checkin
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
