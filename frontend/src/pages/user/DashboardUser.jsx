import React, { useEffect, useState } from "react";
import CardStat from "../../components/CardStat";
import BarChartStat from "../../components/BarChart";
import PieChartStat from "../../components/PieChart";
import UserLayout from "../../layouts/UserLayout";
import axios from "axios";

const DashboardUser = () => {
  const [stats, setStats] = useState({
    hadir: 0,
    tidakHadir: 0,
    absenValid: 0,
  });

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {  
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
          withCredentials: true,
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(localStorage.getItem("token"));
        

        const data = response.data.data;

        setStats({
          hadir: data.hadir,
          tidakHadir: data.tidakHadir,
          absenValid: data.hadir,
        });

        console.log(data.barchart);
        
        setBarData(data.barchart);
        setPieData(data.piechart);
      } catch (error) {
        if(error.status == 401){
          window.location.replace("http://localhost:5173/login");

        }
        console.error("Gagal mengambil data dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <UserLayout>
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardStat title="Total Hadir" value={stats.hadir} color="bg-blue-500" />
        <CardStat title="Total Tidak Hadir" value={stats.tidakHadir} color="bg-red-500" />
        <CardStat title="Absen Valid" value={stats.absenValid} color="bg-green-500" />
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
        <BarChartStat data={barData} />
        <PieChartStat data={pieData} />
      </div>
    </UserLayout>
  );
};

export default DashboardUser;
