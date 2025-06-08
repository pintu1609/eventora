"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useEventRegistration } from "@/hooks/registration";
import GuestCard from "@/compoments/guestcard/GuestCard";
import { ClipLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";

interface Guest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  doc: string;
  status: string;
  hasEntered: boolean;
}

export default function RegistrationList() {
  const {
    fetchGuest,
    loadingFetchGuestList,
    deleteGuest,
    loadingDeleteGuest,
  } = useEventRegistration();
  const [guestList, setGuestList] = useState<Guest[]>([]);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);

  useEffect(() => {
    const loadGuests = async () => {
      const data = await fetchGuest();
      if (data) {
        setGuestList(data.data);
      }
    };
    loadGuests();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (guestId: string) => {
    await deleteGuest(guestId);
    const updatedGuestList = guestList.filter((guest) => guest._id !== guestId);
    setGuestList(updatedGuestList);
  };

  return (
    <div className="p-2 md:p-12 min-h-screen bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        Guest Registrations List
      </h2>

      {loadingFetchGuestList ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        <>
          {/* Table View for Medium and Larger Screens */}
          <div className="hidden md:block bg-white rounded-lg shadow-md p-4 overflow-x-auto">
            <Table aria-label="Guest registration table" isStriped>
              <TableHeader>
                <TableColumn className="text-center">NAME</TableColumn>
                <TableColumn className="text-center">Email</TableColumn>
                <TableColumn className="text-center">Phone</TableColumn>
                <TableColumn className="text-center">Status</TableColumn>
                <TableColumn className="text-center">HasEntered</TableColumn>
                <TableColumn className="text-center">View</TableColumn>
                <TableColumn className="text-center">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {guestList.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">{user.phone}</TableCell>
                    <TableCell className="text-center">
                      {user.status === "pending"
                        ? "Pending"
                        : user.status === "approved"
                        ? "Approved"
                        : "Cancelled"}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.hasEntered ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setSelectedGuestId(user._id)}
                      >
                        View
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(user._id)}
                      >
                        {loadingDeleteGuest ? (
                          <ClipLoader color="#36d7b7" size={20} />
                        ) : (
                          <FaTrash size={18} />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {guestList.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
              >
                <div>
                  <span className="font-semibold">Name:</span> {user.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {user.phone}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {user.status === "pending"
                    ? "Pending"
                    : user.status === "approved"
                    ? "Approved"
                    : "Cancelled"}
                </div>
                <div>
                  <span className="font-semibold">Has Entered:</span>{" "}
                  {user.hasEntered ? "Yes" : "No"}
                </div>
                <div className="flex gap-4 mt-2">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => setSelectedGuestId(user._id)}
                  >
                    View
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    {loadingDeleteGuest ? (
                      <ClipLoader color="#36d7b7" size={18} />
                    ) : (
                      <FaTrash size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedGuestId && (
        <GuestCard
          guestId={selectedGuestId}
          onClose={() => setSelectedGuestId(null)}
          onStatusChange={(status) => {
            setGuestList((prevList) =>
              prevList.map((guest) =>
                guest._id === selectedGuestId ? { ...guest, status } : guest
              )
            );
          }}
        />
      )}
    </div>
  );
}
