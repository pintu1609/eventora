"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import ENDPOINT from "../endPoint";

export const useScan = () => {
  // const getToken = () => {
  //   return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // };

  const getToken = () => {
  if (typeof document === "undefined") return null;

  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const c = cookies[i].trim();
    if (c.startsWith(name)) {
      return c.substring(name.length);
    }
  }

  return null;
};
  const [loading, setLoading] = useState(false);
  const [loadingCheckinGuest, setLoadingCheckinGuest] = useState(false);

  const scanQr = async (values: { qrCode: string }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ENDPOINT.SCANQRCODE}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      if (error?.status === 401) {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
        
      }
      toast.error(error?.response?.data?.message || "Scan QR failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkinGuest = async (guestId: string) => {
    setLoadingCheckinGuest(true);
    try {
      const res = await axios.post(
        `${ENDPOINT.CHECKINGUEST}`,
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
      if (error?.status === 401) {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/";
        
      }
      toast.error(error?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingCheckinGuest(false);
    }
  };

  return {
    scanQr,
    loading,
    checkinGuest,
    loadingCheckinGuest,
  };
};
