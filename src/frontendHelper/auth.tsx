// "use client";
// import { useEffect, useState } from "react";

// export const useAuthStatus = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return isAuthenticated;
// };

"use client";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const getTokenFromCookies = () => {
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

    const token = getTokenFromCookies();

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};
