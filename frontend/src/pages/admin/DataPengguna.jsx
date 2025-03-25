import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import TableUser from "../../components/TableUser";
import UserFormModal from "../../components/UserFormModal";
import EditUserFormModal from "../../components/EditUserFormModal";

const dummyUsers = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  nama: "John Doe",
  email: `johndoe${i + 1}@um.ac.id`,
  status: i % 2 === 0 ? "Siswa" : "Admin",
  alamat: "Jl. Bandung",
}));

const DataPengguna = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert("Pengguna berhasil ditambahkan!");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    alert("Pengguna berhasil diedit!");
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3674B5] hover:bg-[#1B4B82] cursor-pointer text-white px-4 py-2 rounded"
          >
            + Pengguna
          </button>
        </div>

        {/* Modal Tambah */}
        <UserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
        />

        {/* Modal Edit */}
        <EditUserFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleSubmitEdit}
          user={selectedUser}
        />

        {/* Tabel pengguna */}
        <TableUser users={dummyUsers} onEdit={handleEditUser} />
      </div>
    </AdminLayout>
  );
};

export default DataPengguna;
