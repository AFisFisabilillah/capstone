import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import CardStat from "../../components/CardStat";
import BarChartStat from "../../components/BarChart";
import PieChartStat from "../../components/PieChart";
import UserLayout from "../../layouts/UserLayout";

const DashboardUser = () => {
  return (
        <UserLayout>
          {/* Kartu Statistik */}
          {/* Keseluruhan Data Kehadiran */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStat title="Total Hadir" value="250" color="bg-blue-500" />
            <CardStat title="Total Tidak Hadir" value="30" color="bg-red-500" />
            <CardStat title="Absen Valid" value="280" color="bg-green-500" />
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            <BarChartStat />
            <PieChartStat />
          </div>
        </UserLayout>
  );
};

export default DashboardUser;
