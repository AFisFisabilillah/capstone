import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", Hadir: 30, "Tidak Hadir": 0 },
  { name: "Feb", Hadir: 30, "Tidak Hadir": 0 },
  { name: "Mar", Hadir: 31, "Tidak Hadir": 0 },
  { name: "Apr", Hadir: 29, "Tidak Hadir": 1 },
  { name: "Mei", Hadir: 28, "Tidak Hadir": 2 },
];

const BarChartStat = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Statistik Kehadiran Per Bulan</h3>
      {/* Data Per Bulan */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barGap={8} barCategoryGap="30%">
          <XAxis dataKey="name" tick={{ fill: "#8884d8" }} />
          <YAxis />
          <Tooltip cursor={{ fill: "rgba(200,200,200,0.2)" }} />
          <Legend />
          <Bar dataKey="Hadir" fill="#8884d8" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Tidak Hadir" fill="#FF6B6B" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartStat;
