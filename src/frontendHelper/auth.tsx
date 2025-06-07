"use client";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsAuthenticated(true);
  }
}, []);

return isAuthenticated;
};