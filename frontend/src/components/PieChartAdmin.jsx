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
  { name: "Hadir", value: 175 },
  { name: "Sakit", value: 3 },
  { name: "Izin", value: 2 },
  { name: "Tanpa Keterangan", value: 0 },
];


const COLORS = ["#3b82f6", "#00C49F", "#FFBB28"];

const PieChartAdmin = ({dataPie}) => {
  console.log(dataPie);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Statistik Kehadiran
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={300}>
                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
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
