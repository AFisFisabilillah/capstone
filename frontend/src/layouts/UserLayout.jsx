import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const UserLayout = ({children}) => {
  return (
    <div className="flex bg-indigo-100 min-h-screen">
      {/* Sidebar user */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Halaman utama */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default UserLayout
