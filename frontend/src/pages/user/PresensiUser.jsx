import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import FormPresensiUser from "../../components/FormPresensiUser";
import UserLayout from "../../layouts/UserLayout";

const PresensiUser = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Data Dummy Presensi
  const dataPresensi = [
    { tanggal: "2025-03-12", status: "Valid", keterangan: "Hadir" },
    { tanggal: "2025-03-12", status: "Valid", keterangan: "Hadir" },
    { tanggal: "2025-03-12", status: "Valid", keterangan: "Hadir" },
    {
      tanggal: "2025-03-12",
      status: "Invalid",
      keterangan: "Tanpa Keterangan",
    },
    { tanggal: "2025-03-12", status: "Valid", keterangan: "Hadir" },
    { tanggal: "2025-03-12", status: "Valid", keterangan: "Hadir" },
  ];

  return (
    <UserLayout>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Notifikasi Presensi */}
        <div className="bg-white p-4 h-24 rounded-lg shadow-lg flex items-center gap-4">
          <FaRegTimesCircle className="text-red-500 text-4xl" />
          <p className="text-lg font-semibold text-gray-700">
            Anda Belum Melakukan Presensi Hari Ini
          </p>
        </div>

        {/* Tombol Untuk Melakukan Presensi */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-[#3674B5] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1B4B82] font-bold transition"
        >
          <FaCheckCircle />
          Presensi
        </button>

        {/* Form Presensi Muncul Jika Tombol Diklik */}
        {isFormOpen && (
          <FormPresensiUser onClose={() => setIsFormOpen(false)} />
        )}

        {/* Tabel Presensi */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Presensi</th>
                <th className="p-3 text-left">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {dataPresensi.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{row.tanggal}</td>
                  <td
                    className={`p-3 font-semibold ${
                      row.status === "Valid" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="p-3">{row.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
};

export default PresensiUser;
