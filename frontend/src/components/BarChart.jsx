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



const BarChartStat = ({data}) => {
  
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-gray-600 mb-4 text-lg font-semibold mb-4">Statistik Kehadiran Per Bulan</h3>
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
