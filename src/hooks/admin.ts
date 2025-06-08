"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import  ENDPOINT  from "../endPoint"

export const useAdminLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (userName: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${ENDPOINT.ADMINLOGIN}`, { userName, password });
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.data.token);
      return true;
    } catch (err : unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
