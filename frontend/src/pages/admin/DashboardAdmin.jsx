import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import CardStat from "../../components/CardStat";
import PieChartAdmin from "../../components/PieChartAdmin";
import BarChartAdmin from "../../components/BarChartAdmin";

const DashboardAdmin = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <CardStat title="Total Pengguna" value="300" color="bg-blue-500" />
          <CardStat title="Pengguna Hadir" value="250" color="bg-green-500" />
          <CardStat title="Tidak Hadir" value="50" color="bg-red-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PieChartAdmin />
          <BarChartAdmin />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
