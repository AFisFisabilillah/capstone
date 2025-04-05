import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import TableUser from "../../components/TableUser";
import UserFormModal from "../../components/UserFormModal";
import EditUserFormModal from "../../components/EditUserFormModal";

const DataPengguna = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Respons API:", response.data); 

  
        setUsers(response.data.users || response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post("http://localhost:8000/api/admin/users", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Tambahkan user baru ke daftar
      setUsers((prevUsers) => [...prevUsers, response.data.user || response.data.data]);
      setIsModalOpen(false);
      alert("Pengguna berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambahkan pengguna:", error);
    }
  };

  // Edit pengguna
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("alamat", user.alamat);
        formData.append("role", user.role);

        // Kalau password diisi
        if (updatedUser.password) {
            formData.append("password", user.password);
        }

        // Kalau user mengunggah foto baru
        if (updatedUser.photo instanceof File) {
            formData.append("photo", user.photo);
        }

        const response = await axios.post(
            `http://localhost:8000/api/admin/users/${user}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("Respons API:", response.data);
        setIsEditModalOpen(false);
        alert("Pengguna berhasil diedit!");
        fetchUsers(); // reload data
    } catch (error) {
        console.error("Gagal mengedit pengguna:", error.response?.data || error);
    }
};

const handleDeleteUser = async (user) => {
  const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus pengguna ini?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`http://localhost:8000/api/admin/users/${user}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Pengguna berhasil dihapus!");

    // Update tampilan
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (error) {
    console.error("Gagal menghapus pengguna:", error.response?.data || error);
    alert("Gagal menghapus pengguna.");
  }
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
        <TableUser users={users} onEdit={handleEditUser} />
      </div>
    </AdminLayout>
  );
};

export default DataPengguna;
