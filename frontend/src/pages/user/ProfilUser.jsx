import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import UserLayout from "../../layouts/UserLayout";

const ProfilUser = () => {
  return (
   <UserLayout>
      {/* Content */}
        <div className="flex justify-center items-center h-full p-8">
          <div className="p-10 rounded-3xl bg-white shadow-2xl w-[850px] h-[650px] text-center">
            {/* Foto Profil */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  alt="User"
                  className="w-40 h-40 rounded-full shadow-xl border-4 border-white"
                />

              </div>
              <h2 className="text-4xl font-bold gray-950 mt-4">John Doe</h2>
              <p className="text-[#3674B5] font-semibold text-lg">Siswa</p>
            </div>

            {/* Informasi Siswa */}
            <div className="mt-8 space-y-6 text-lg text-left px-8">
              {[
                { label: "Nama", value: "John Doe" },
                { label: "Email", value: "johndoe@um.ac.id" },
                { label: "Alamat", value: "Jl Soekarno Hatta" },
                { label: "Status", value: "Siswa" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4"
                >
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
