import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const ProfilAdmin = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAdminData(response.data.admin);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  if (!adminData) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full p-8">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Content */}
      <div className="flex justify-center items-center h-full p-8">
        <div className="p-10 rounded-3xl bg-white shadow-2xl w-[850px] h-[650px] text-center">
          {/* Foto Profil */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={adminData.foto || "https://randomuser.me/api/portraits/men/10.jpg"}
                alt="User"
                className="w-40 h-40 rounded-full shadow-xl border-4 border-white"
              />
            </div>
            <h2 className="text-4xl font-bold gray-950 mt-4">{adminData.nama}</h2>
            <p className="text-[#3674B5] font-semibold text-lg">{adminData.status}</p>
          </div>

          {/* Informasi Admin */}
          <div className="mt-8 space-y-6 text-lg text-left px-8">
            {[
              { label: "Nama", value: adminData.nama },
              { label: "Email", value: adminData.email },
              { label: "Alamat", value: adminData.alamat || "Tidak tersedia" },
              { label: "Status", value: adminData.status },
            ].map((item, index) => (
              <div key={index} className="flex justify-between p-4">
                <span className="font-semibold">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProfilAdmin;
