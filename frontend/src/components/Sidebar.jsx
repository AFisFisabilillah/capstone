import { Link } from "react-router-dom";
import { FaHome, FaClipboardList, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#3674B5] text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">LOGO</h2>
      <ul className="space-y-4 mt-10">
        <li>
          <Link
            to="/"
            className="flex font-semibold items-center gap-2 p-2 rounded-lg hover:bg-[#1B4B82]"
          >
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/presensi"
            className="flex font-semibold items-center gap-2 p-2 rounded-lg hover:bg-[#1B4B82]"
          >
            <FaClipboardList /> Presensi
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="flex font-semibold items-center gap-2 p-2 rounded-lg hover:bg-[#1B4B82]"
          >
            <FaUser /> Profil
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
