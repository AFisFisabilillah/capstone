import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaClipboardList, FaUser } from "react-icons/fa";

const SidebarAdmin = () => {
  return (
    <div className="w-64 bg-[#3674B5] text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4 mt-10">
        <li>
          <Link
            to="/admin/"
            className="flex font-semibold items-center gap-2 p-2 rounded-md hover:bg-[#1B4B82]"
          >
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/data-pengguna"
            className="flex font-semibold items-center gap-2 p-2 rounded-md hover:bg-[#1B4B82]"
          >
            <FaUsers /> Data Pengguna
          </Link>
        </li>
        <li>
          <Link
            to="/admin/data-presensi"
            className="flex font-semibold items-center gap-2 p-2 rounded-md hover:bg-[#1B4B82]"
          >
            <FaClipboardList /> Data Presensi
          </Link>
        </li>
        <li>
          <Link
            to="/admin/profil"
            className="flex font-semibold items-center gap-2 p-2 rounded-md hover:bg-[#1B4B82]"
          >
            <FaUser /> Profil Admin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
