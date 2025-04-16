import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableUser = ({ users = [], onEdit, onDelete }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500">Data pengguna tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-gray-600 mb-4 p-3 text-left">No</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Nama</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Email</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Password</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Status</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Alamat</th>
            <th className="text-gray-600 mb-4 p-3 text-left">Foto</th>
            <th className="text-gray-600 mb-4 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index} className="border-t">
              <td className="text-gray-600 mb-4 p-3">{index + 1}</td>
              <td className="text-gray-600 mb-4 p-3">{user.name || "-"}</td>
              <td className="text-gray-600 mb-4 p-3">{user.email || "-"}</td>
              <td className="text-gray-600 mb-4 p-3">{user.password || "-"}</td>
              <td className="text-gray-600 mb-4 p-3">{user.role || "-"}</td>
              <td className="text-gray-600 mb-4 p-3">{user.alamat || "-"}</td>
              <td className="text-gray-600 mb-4 p-3">
                <div
                  className="size-20 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${user.photo})` }}
                ></div>
              </td>
              <td className="text-gray-600 mb-4 p-3 flex justify-center gap-2">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => onEdit(user)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => onDelete(user)}
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

export default TableUser;
