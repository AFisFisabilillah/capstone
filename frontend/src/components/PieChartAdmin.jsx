import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataPie = [
  { name: "Hadir", value: 250, color: "#4CAF50" },
  { name: "Tidak Hadir", value: 50, color: "#F44336" },
];

const PieChartAdmin = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Statistik Kehadiran
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={dataPie} cx="50%" cy="50%" outerRadius={80} label>
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartAdmin;
