"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import ENDPOINT from "../endPoint";

export const useUploadImage = () => {
  const [imageLoading, setImageLoading] = useState(false);

  const uploadImage = async (file: File) => {
    setImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ this is what the backend expects

      const res = await axios.post(`${ENDPOINT.UPLOADIMAGE}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      setImageLoading(false);
    }
  };

  return { uploadImage, imageLoading };
};
