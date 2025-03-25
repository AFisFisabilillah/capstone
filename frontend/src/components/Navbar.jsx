import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-white h-16 flex justify-between items-center px-6 shadow-md">
      <div></div> {/* Placeholder untuk menjaga keseimbangan */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-semibold">John Doe</span>
        <FaUserCircle className="text-gray-500" size={24} />
      </div>
    </div>
  );
};

export default Navbar;
