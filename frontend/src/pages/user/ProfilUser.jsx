import React, {useState,useEffect} from "react";

import axios from 'axios';
import UserLayout from "../../layouts/UserLayout";

const ProfilUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("RESPON PROFIL:", response.data);
        setUserData(response.data.data);

      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userData) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-full p-8">
          <p>Loading...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex justify-center items-center h-full p-8">
        <div className="p-10 rounded-3xl bg-white shadow-2xl w-[850px] h-[650px] text-center">
          {/* Foto Profil */}
          <div className="flex flex-col items-center">
            <div className="relative object-cover">
              <img
                src={userData.photo}
                alt="User"
                className="w-40 h-40 rounded-full shadow-xl border-4 border-white"
              />
            </div>
            <h2 className="text-4xl font-bold text-gray-950 mt-4">{userData.name}</h2>
            <p className="text-[#3674B5] font-semibold text-lg">{userData.role}</p>
          </div>

          {/* Informasi User */}
          <div className="text-gray-600 mb-4 mt-8 space-y-6 text-lg text-left px-8">
            {[
              { label: "Nama", value: userData.name },
              { label: "Email", value: userData.email },
              { label: "Alamat", value: userData.alamat || "Tidak tersedia" },
              { label: "Status", value: userData.role },
            ].map((item, index) => (
              <div key={index} className="flex justify-between p-4">
                <span className="font-semibold">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfilUser;
