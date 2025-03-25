import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TableUser = ({ users, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Alamat</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{user.nama}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">{user.alamat}</td>
              <td className="p-3 flex justify-center gap-2">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => onEdit(user)}
                >
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white p-2 rounded">
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
