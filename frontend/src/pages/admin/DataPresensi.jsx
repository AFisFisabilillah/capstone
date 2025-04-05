import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import TableDataPresensi from "../../components/TableDataPresensi";
import PresensiFormModal from "../../components/PresensiFormModal";
import EditPresensiFormModal from "../../components/EditPresensiFormModal";

const DataPresensi = () => {
  const [presensiData, setPresensiData] = useState([]); // State untuk menyimpan data presensi
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPresensi, setSelectedPresensi] = useState(null);

  // Fetch data presensi dari backend
  useEffect(() => {
    const fetchPresensi = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/presensi", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Gunakan auth jika perlu
          },
        });
        setPresensiData(response.data.presensi);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      }
    };

    fetchPresensi();
  }, []);

  // Tambah presensi
  const handleAddPresensi = async (presensi) => {
    try {
      const response = await axios.post("http://localhost:8000/api/admin/presensi", presensi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPresensiData([...presensiData, response.data.presensi]); // Tambahkan data baru ke state
      setIsAddModalOpen(false);
      alert("Presensi berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambahkan presensi:", error);
    }
  };

  // Edit presensi
  const handleEdit = (presensi) => {
    setSelectedPresensi(presensi);
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (updatedPresensi) => {
    try {
      await axios.put(`http://localhost:8000/api/admin/presensi/${updatedPresensi.id}`, updatedPresensi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPresensiData(presensiData.map((p) => (p.id === updatedPresensi.id ? updatedPresensi : p)));
      setIsEditModalOpen(false);
      alert("Presensi berhasil diedit!");
    } catch (error) {
      console.error("Gagal mengedit presensi:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex mb-4 justify-end">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#3674B5] hover:bg-[#1B4B82] text-white px-4 py-2 rounded"
          >
            + Presensi
          </button>
        </div>

        {/* Modal Tambah Presensi */}
        <PresensiFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddPresensi} />

        {/* Modal Edit Presensi */}
        <EditPresensiFormModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleSubmitEdit} presensi={selectedPresensi} />

        {/* Tabel Data Presensi */}
        <TableDataPresensi presensi={presensiData} onEdit={handleEdit} />
      </div>
    </AdminLayout>
  );
};

export default DataPresensi;
