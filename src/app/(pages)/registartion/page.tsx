"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUploadImage } from "@/hooks/uploadImage"
import { initialRegistration, guestSchema } from "@/frontValidation"
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEventRegistration } from "@/hooks/registration";
import { useRouter } from "next/navigation";
import { BeatLoader, ClipLoader } from "react-spinners";

// import QRCode from "qrcode.react";
import QRCode from "qrcode";
import Image from "next/image";



export default function GuestRegistrationPage() {

  const router = useRouter();
  const { uploadImage, imageLoading } = useUploadImage();
  const { eventRegestration, loading } = useEventRegistration();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

   const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const upiData = "upi://pay?pa=pintukumar808284@okaxis&pn=Guest&am=500"; // sample UPI link
    QRCode.toDataURL(upiData)
      .then(setQrUrl)
      .catch((err) => console.error("QR code generation failed", err));
  }, []);


  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues: initialRegistration,
    validationSchema: toFormikValidationSchema(guestSchema),
    onSubmit: async () => {
      try {


        const success = await eventRegestration(values);
        console.log("🚀 ~ onSubmit: ~ success:", success)
        if (success.status === 201) {
          resetForm();
          router.push(`/confirmation?id=${success.id}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Login failed. Try again.");
      }
    },
  });
  console.log("🚀 ~ GuestRegistrationPage ~ errors:", errors)


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("🚀 ~ handleFileChange ~ file:", file)
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file)); // preview

    try {
      const uploadedFileId = await uploadImage(file);
      if (uploadedFileId) {
        setFieldValue("image", uploadedFileId._id);
        // toast.success("Receipt uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading receipt");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 px-4">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Guest Registration</h2> */}
         <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to the Event!</h2>
      <p className="text-gray-600 text-sm mt-1">
        Please fill out your details to register. Make sure to upload your payment receipt after making the payment.
      </p>
    </div>

    {/* 🆕 QR Code for Payment */}
    <div className="flex flex-col  justify-center gap-4 items-center md:flex-row md:gap-16">
    <div className="flex flex-col items-center mb-6">
      <p className="font-medium text-gray-700 mb-2">Scan to Pay</p>
      {/* <QRCode value="upi://pay?pa=pintukumar808284@okaxis&pn=EventName&am=500" size={128} /> */}
      {qrUrl ? (
        <Image src={qrUrl} alt="QR Code" className="w-40 h-40 mx-auto" width={128} height={128} />
      ) : (
        <p>Generating QR Code...</p>
      )}
      <p className="text-sm text-gray-500 mt-2">Amount: ₹500 | UPI: <span className="font-medium">pintukumar808284@okaxis</span></p>
    </div>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mb-4 md:mb-0">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold" >
            Name:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}

              className={`mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-400 placeholder:text-lg   ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
            />
          </label>

          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold">
            Email:
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}

              className={`mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-400 placeholder:text-lg   ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
            />
          </label>

          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold">
            Phone:
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}

              className={`mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-400 placeholder:text-lg   ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"}`}
            />
          </label>

          <label className="flex flex-col gap-2 text-left text-lg text-gray-600 font-semibold">
            Payment Recepit:
            <div className="flex flex-row gap-2 items-center justify-between">
              {/* {previewUrl && ( */}
              {imageLoading ? <ClipLoader color="black" size={50} /> :
              <div className="w-12 h-[48px]">
                {/* <p className="text-sm text-gray-500 mb-2">Preview:</p> */}
                {previewUrl ?(
                <Image
                  src={previewUrl}
                  alt="Receipt Preview"
                  className="max-h-16 mx-auto rounded shadow  object-cover"
                  width={100}
                  height={100}
                />):(<Image
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Receipt Preview"
                  className="max-h-16 mx-auto rounded shadow  object-cover"
                  width={100}
                  height={100}
                />)}
              </div>
               }
              {/* )} */}
              <input
                className={` w-4/5 mt-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none placeholder:text-gray-400 placeholder:text-lg   ${errors.image && touched.image ? "border-red-500" : "border-gray-300"}`}
                type="file"
                name="receipt"
                onChange={handleFileChange}


              />
            </div>
          </label>



          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 mx-auto" disabled={loading ||imageLoading}>
            {loading ? <BeatLoader color="white" size={8} /> : "Register"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}


