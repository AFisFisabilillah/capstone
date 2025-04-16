import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const FormPresensiUser = ({ onClose }) => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [loading, setLoading] = useState(false);

  // Aktifkan kamera saat form dibuka
  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // Kamera depan
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

    // Cleanup saat komponen unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Matikan kamera
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    onClose(); // Tutup form
  };

  // Tangkap gambar dari webcam dan kirim ke server
  const captureImage = async () => {
    if (!videoRef.current) return;

    setLoading(true);

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    // Convert base64 ke Blob
    const byteString = atob(imageData.split(",")[1]);
    const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Buat FormData
    const formData = new FormData();
    formData.append("image", blob, "presensi.png");
    formData.append("name", localStorage.getItem("email"));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/api/absensi", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
      onClose();
      window.location.reload(); // Update tabel presensi
    } catch (error) {
      console.error("Presensi gagal:", error);
      if (error.response) {
        console.log(error.response.data);
      }
      alert("Presensi gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
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
          className="w-full h-60 mb-4 rounded-lg bg-black"
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-between mt-6">
        <button
          onClick={stopCamera}
          className="bg-gray-400 text-gray-950 font-semibold px-5 py-2 rounded-lg hover:bg-gray-500"
        >
          Kembali
        </button>
        <button
          onClick={captureImage}
          disabled={loading}
          className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Mengunggah..." : "Presensi"}
        </button>
      </div>
    </div>
  );
};

export default FormPresensiUser;
