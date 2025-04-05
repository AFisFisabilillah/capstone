import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataBar = [
  { name: "Total Pengguna", jumlah: 300 },
  { name: "Hadir", jumlah: 250 },
  { name: "Tidak Hadir", jumlah: 50 },
];

const BarChartAdmin = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Jumlah Pengguna
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataBar}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jumlah" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartAdmin;
