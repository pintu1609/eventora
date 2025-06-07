"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ENDPOINT from "../endPoint";

export const usescan = () => {
  const getToken = () => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  };
  const [loading, setLoading] = useState(false);
  const [loadingCheckinGuest, setLoadingCheckinGuest] = useState(false);
  
  const scanQr = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ENDPOINT.SCANQRCODE}`, values,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
      toast.success(res.data.message);
      return res.data;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Scan QR failed");
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
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "fetch guest list failed");
      return false;
    } finally {
      setLoadingCheckinGuest(false);
    }
  };

 

  return {
    scanQr,
    loading,
    checkinGuest,
    loadingCheckinGuest
  };
};
