"use client";
import { useAdminLogin } from "@/hooks/admin";
import React from "react";
import { BeatLoader } from "react-spinners";
import { useFormik } from "formik";
import { initialAdminLogin, adminLoginSchema } from "@/frontValidation";
import toast from "react-hot-toast";
import { toFormikValidationSchema } from 'zod-formik-adapter';
// import { useRouter } from "next/navigation";



export default function Admin() {
  // const router = useRouter();

  const { login, loading } = useAdminLogin();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialAdminLogin,
    validationSchema: toFormikValidationSchema(adminLoginSchema),
    onSubmit: async () => {
      try {
        const success = await login(values.userName, values.password);
        if (success) {
          resetForm();
          // router.push("/registrationList");
          window.location.href = "/registrationList"
          toast.success(success.message || "Login successful");
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Login failed. Try again.");
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold">
            Username:
            <input
              type="text"
              name="userName"
              placeholder="Enter your username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
              className={`mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-600 placeholder:text-sm   ${errors.userName && touched.userName ? "border-red-500" : "border-gray-300"}`}
            />
          </label>

          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold">
            Password:
            <input
              type="password"
              name="password"

              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-600 placeholder:text-sm ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}
            />
          </label>

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:opacity-50 mx-auto"
            disabled={loading}
          >
            {loading ? <BeatLoader size={8} color="white" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
