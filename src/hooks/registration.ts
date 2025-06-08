"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import ENDPOINT from "../endPoint";

interface RegesterGuest {
  name: string;
  email: string;
  phone: string;
  image: string;
}

export const useEventRegistration = () => {
  const getToken = () => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  };
  const [loading, setLoading] = useState(false);
  const [loadingFetchGuestList, setLoadingFetchGuestList] = useState(false);
  const [loadingFetchGuestListByID, setLoadingFetchGuestListBYID] =
    useState(false);
  const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
  const [loadingDeleteGuest, setLoadingDeleteGuest] = useState(false);


  const eventRegestration = async (values: RegesterGuest) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ENDPOINT.EVENTREGISTRATION}`, values);
      toast.success(res.data.message);
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(error?.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchGuest = async () => {
    setLoadingFetchGuestList(true);
    try {
      const res = await axios.get(`${ENDPOINT.EVENTREGISTRATION}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingFetchGuestList(false);
    }
  };

  const fetchGuestBYID = async (guestId: string) => {
    setLoadingFetchGuestListBYID(true);
    try {
      const res = await axios.post(
        `${ENDPOINT.FETCHSINGLEGUEST}`,
        { id: guestId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success(res.data.message);
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingFetchGuestListBYID(false);
    }
  };

  const updateGuestStatus = async (guestId: string, status: string) => {
    setLoadingUpdateStatus(true);
    try {
      const res = await axios.put(
        `${ENDPOINT.EVENTREGISTRATION}`,
        { id: guestId, status: status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success(res.data.message);
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingUpdateStatus(false);
    }
  };

  const deleteGuest = async (guestId: string) => {
    setLoadingDeleteGuest(true);
    try {
      const res = await axios.delete(`${ENDPOINT.EVENTREGISTRATION}`, {
        data: { id: guestId },

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success(res.data.message);
      return res;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingDeleteGuest(false);
    }
  };

  return {
    eventRegestration,
    loading,
    fetchGuest,
    loadingFetchGuestList,
    fetchGuestBYID,
    loadingFetchGuestListByID,
    updateGuestStatus,
    loadingUpdateStatus,
    deleteGuest,
    loadingDeleteGuest,
  };
};
