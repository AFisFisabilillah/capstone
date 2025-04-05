import React, { useRef, useState, useEffect } from "react";

const FormPresensiUser = ({ onClose }) => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  // Mengaktifkan Kamera Saat Form Dibuka
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setMediaStream(stream);
        }
      } catch (error) {
        console.error("Gagal mengakses kamera:", error);
      }
    };

    startCamera();
  }, []);

  // Matikan Kamera
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    onClose(); // Tutup form setelah kamera dimatikan
  };

  // Menangkap Gambar dari Kamera
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    console.log("Gambar diambil:", imageData);
  };

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-xl shadow-lg z-50 w-[500px] h-[450px] flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-4">Form Presensi</h2>

      {/* Tampilan Webcam */}
      <div className="flex flex-col items-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-60 mb-4"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-between mt-6">
        <button
          onClick={stopCamera} // Kamera mati saat tombol kembali diklik
          className="bg-gray-400 text-gray-950 font-semibold px-5 py-2 rounded-lg hover:bg-gray-500"
        >
          Kembali
        </button>
        <button
          onClick={captureImage}
          className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Presensi
        </button>
      </div>
    </div>
  );
};

export default FormPresensiUser;
