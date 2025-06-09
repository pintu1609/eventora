"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ClipLoader } from "react-spinners"; // You can use any loader

const Template = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // You can adjust this delay as needed

    return () => clearTimeout(timer);
  }, [currentPath]);

  if (loading) {
    return (
      <div className=" bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center h-screen">
        <ClipLoader size={90} color="#3b82f6" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Template;
