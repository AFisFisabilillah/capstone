import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableDataPresensi = ({ presensi, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Presensi</th>
            <th className="p-3 text-left">Keterangan</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {presensi.map((item, index) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.nama}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.presensi}</td>
              <td className="p-3">{item.keterangan}</td>
              <td className="p-3 flex justify-center gap-2">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => onEdit(item)} // Kirim data presensi ke fungsi handleEdit
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => onDelete(item.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDataPresensi;
