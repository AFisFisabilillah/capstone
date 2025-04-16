import React, { useEffect, useState } from "react";
import axios from "axios"; // Untuk melakukan request ke backend
import AdminLayout from "../../layouts/AdminLayout";
import CardStat from "../../components/CardStat";
import PieChartAdmin from "../../components/PieChartAdmin";
import BarChartAdmin from "../../components/BarChartAdmin";

const DashboardAdmin = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPengguna: 0,
    penggunaHadir: 0,
    tidakHadir: 0,
  });
  const [piechart, setPieChart] = useState([]);

  useEffect(() => {
    // Ambil data dari backend saat halaman dimuat
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }).then(res=> res.json());
        console.log(response);
        
        
        
        const data = response.data;
        console.log(data);
        
        setDashboardData({
          totalPengguna: data.totaluser,
          penggunaHadir: data.hadir,
          tidakHadir: data.tidakHadir,
        });
        
        setPieChart(data.piechart);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      }
    };

    

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CardStat title="Total Pengguna" value={dashboardData.totalPengguna} color="bg-blue-500" />
          <CardStat title="Pengguna Hadir" value={dashboardData.penggunaHadir} color="bg-green-500" />
          <CardStat title="Tidak Hadir" value={dashboardData.tidakHadir} color="bg-red-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PieChartAdmin dataPie={piechart}/>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
