import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

const ProfilAdmin = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/profile", {
          withCredentials: true,
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
      <div className="flex justify-center items-center h-full p-8">
        <div className="p-10 rounded-3xl bg-white shadow-2xl w-[850px] h-[650px] text-center">
          {/* Foto Profil */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={adminData.photo}
                alt="User"
                className="w-40 h-40 rounded-full shadow-xl border-4 border-white"
              />
            </div>
            <h2 className="text-4xl font-bold text-gray-950 mt-4">{adminData.name}</h2>
            <p className="text-[#3674B5] font-semibold text-lg">{adminData.role}</p>
          </div>

          {/* Informasi Admin */}
          <div className="text-gray-600 mb-4 mt-8 space-y-6 text-lg text-left px-8">
            {[
              { label: "Nama", value: adminData.name },
              { label: "Email", value: adminData.email },
              { label: "Alamat", value: adminData.alamat || "Tidak tersedia" },
              { label: "Status", value: adminData.role },
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
