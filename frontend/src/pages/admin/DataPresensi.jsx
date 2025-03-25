import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import TableDataPresensi from "../../components/TableDataPresensi";
import PresensiFormModal from "../../components/PresensiFormModal";
import EditPresensiFormModal from "../../components/EditPresensiFormModal";

const DataPresensi = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPresensi, setSelectedPresensi] = useState(null);

  const presensiData = [
    {
      id: 1,
      nama: "John Doe",
      status: "Siswa",
      presensi: "Valid",
      keterangan: "Hadir",
    },
    {
      id: 2,
      nama: "Jane Smith",
      status: "Guru",
      presensi: "Tidak Valid",
      keterangan: "Sakit",
    },
  ];

  // Fungsi untuk membuka modal edit dan menyimpan data yang akan diedit
  const handleEdit = (presensi) => {
    setSelectedPresensi(presensi);
    setIsEditModalOpen(true);
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
        <PresensiFormModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />

        {/* Modal Edit Presensi */}
        <EditPresensiFormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          presensi={selectedPresensi}
        />

        {/* Tabel Data Presensi */}
        <TableDataPresensi
          presensi={presensiData}
          onEdit={handleEdit} // Pastikan fungsi onEdit diteruskan
          onDelete={() => {}}
        />
      </div>
    </AdminLayout>
  );
};

export default DataPresensi;
