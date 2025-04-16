import React, { useState, useEffect } from "react";
import { FaRegTimesCircle, FaCheckCircle } from "react-icons/fa";
import FormPresensiUser from "../../components/FormPresensiUser";
import UserLayout from "../../layouts/UserLayout";
import axios from "axios";

const PresensiUser = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dataPresensi, setDataPresensi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [todayPresensi, setTodayPresensi] = useState(false);

  useEffect(() => {
    const fetchPresensi = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/absensi/my", {
          headers: {
            Authorization: `Bearer ${token}`, // Perbaiki di sini
          },
        });

        const data = res.data.data;
        setDataPresensi(data);

        // Cek apakah sudah presensi hari ini
        const today = new Date().toISOString().slice(0, 10); // format yyyy-mm-dd
        const isToday = data.some((item) => item.tanggal.slice(0, 10) === today); // Sesuaikan format tanggal
        setTodayPresensi(isToday);
      } catch (error) {
        console.error("Gagal mengambil data presensi", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresensi();
  }, []);

  return (
    <UserLayout>
      <div className="p-6 space-y-6">
        {/* Notifikasi Presensi */}
        {!todayPresensi && !isLoading && (
          <div className="bg-white p-4 h-24 rounded-lg shadow-lg flex items-center gap-4">
            <FaRegTimesCircle className="text-red-500 text-4xl" />
            <p className="text-lg font-semibold text-gray-700">
              Anda Belum Melakukan Presensi Hari Ini
            </p>
          </div>
        )}

        {/* Tombol Untuk Melakukan Presensi */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-[#3674B5] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1B4B82] font-bold transition"
        >
          <FaCheckCircle />
          Presensi
        </button>

        {/* Form Presensi */}
        {isFormOpen && <FormPresensiUser onClose={() => setIsFormOpen(false)} />}

        {/* Tabel Presensi */}
        <div className="text-gray-600 mb-4 bg-white p-6 rounded-lg shadow-lg">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-600 mb-4 p-3 text-left">Tanggal</th>
                  <th className="text-gray-600 mb-4 p-3 text-left">Presensi</th>
                  <th className="text-gray-600 mb-4 p-3 text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {dataPresensi.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="text-gray-600 mb-4 p-3">{row.tanggal}</td>
                    <td
                      className={`p-3 font-semibold ${
                        row.status === "berhasil" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {row.status}
                    </td>
                    <td className="text-gray-600 mb-4 p-3">{row.status ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default PresensiUser;
