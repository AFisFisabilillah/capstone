import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableDataPresensi = ({ presensi, onEdit, onDelete }) => {
  console.log(presensi);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-gray-600 mb-4 p-3 text-left">No</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Nama</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Status</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          
          {presensi.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="text-gray-600 mb-4 p-3">{index + 1}</td>
              <td className="text-gray-600 mb-4 p-3">{item.user}</td>
              <td className="text-gray-600 mb-4 p-3">{item.status}</td>
              <td className="text-gray-600 mb-4 p-3">{item.tanggal}</td>
              <td className="text-gray-600 mb-4 p-3 flex justify-center gap-2">
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDataPresensi;
