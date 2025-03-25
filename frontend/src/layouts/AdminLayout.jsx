import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-indigo-100 min-h-screen">
      {/* Sidebar admin */}
      <SidebarAdmin />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Halaman utama */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
