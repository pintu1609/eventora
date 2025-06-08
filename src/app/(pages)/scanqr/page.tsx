"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useScan } from "@/hooks/scanqr"
import CheckinCard from "@/compoments/checkincard/checkincard";


export default function ScanQr() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const { scanQr, loading } = useScan();

  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [guestData, setGuestData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    }, false);

    scanner.render(
      async (decodedText) => {
        const res = await scanQr({ qrCode: decodedText });
        if (res) {
          setGuestData(res.data.guest);

          setSelectedGuestId(res.data.guest._id);
          //   await scanner.clear();
        }
      },
      (errorMessage) => {
        console.warn("QR Scan error:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [scanQr]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-120px)] p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-100">
      <h2 className="text-xl font-bold text-center text-gray-800">Scan Guest QR Code</h2>
      <div id="qr-reader" ref={scannerRef} className="w-full max-w-sm text-gray-800" />

      {selectedGuestId && guestData && (
        <CheckinCard
          // guestId={selectedGuestId}
          onClose={() => setSelectedGuestId(null)}
          guest={guestData}
          loading={loading}
        />
      )}
    </div>
  );
}
