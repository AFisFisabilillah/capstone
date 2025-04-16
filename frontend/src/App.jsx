import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Halaman User
import DashboardUser from "./pages/user/DashboardUser";
import PresensiUser from "./pages/user/PresensiUser";
import ProfilUser from "./pages/user/ProfilUser";

// Halaman Admin
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DataPengguna from "./pages/admin/DataPengguna";
import DataPresensi from "./pages/admin/DataPresensi";
import ProfilAdmin from "./pages/admin/ProfilAdmin";

// Halaman Login
import Login from "./pages/Login"; // Pastikan path ini sesuai dengan lokasi file Login.js
import Loginuser from "./pages/loginuser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routing untuk Login */}
        <Route path="/login" element={<Login />} />
        {/* Routing untuk Login */}
        <Route path="/loginuser" element={<Loginuser />} />
        {/* Routing untuk User */}
        <Route path="/" element={<DashboardUser />} />
        <Route path="/presensi" element={<PresensiUser />} />
        <Route path="/profile" element={<ProfilUser />} />

        {/* Routing untuk Admin */}
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/data-pengguna" element={<DataPengguna />} />
        <Route path="/admin/data-presensi" element={<DataPresensi />} />
        <Route path="/admin/profil" element={<ProfilAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
