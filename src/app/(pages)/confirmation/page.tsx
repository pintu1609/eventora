"use client";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react"; // Optional icon
import { Suspense } from 'react'


function ConfirmationComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // get id from URL like ?id=abc123

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful</h1>
        <p className="text-gray-600 text-lg mb-4">Thank you for registering. We’ve received your details!</p>

        {id && (
          <div className="bg-gray-100 rounded-md px-4 py-2 border border-gray-300 text-gray-700 text-sm">
            <span className="font-semibold">Registration ID:</span> {id}
          </div>
        )}

        <p className="text-gray-500 mt-6 text-sm">You may now close this window or clik the button below to move to the homepage.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4" onClick={() => window.location.href = "/"}> Go to Homepage</button>
      </div>
    </div>
  );
}

export default function Confirmation() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <ConfirmationComponent />
    </Suspense>
  )
}



