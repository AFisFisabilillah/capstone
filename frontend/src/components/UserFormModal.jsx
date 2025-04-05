import React, { useState } from "react";
import axios from "axios";

const UserFormModal = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Siswa",
    alamat: "",
    photo: null, // Photo harus null agar bisa menyimpan file
  });

  // Handle perubahan input form termasuk file
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0]; // Ambil file pertama yang diunggah
      setFormData({ ...formData, photo: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      alert("Anda belum login. Silakan login terlebih dahulu.");
      return;
    }

    // Gunakan FormData agar file bisa dikirim
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("alamat", formData.alamat);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/users",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Pastikan multipart/form-data
          },
        }
      );

      alert("Pengguna berhasil ditambahkan!");
      onUserAdded();

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Siswa",
        alamat: "",
        photo: null,
      });

      onClose();
    } catch (error) {
      console.error("Gagal menambahkan pengguna:", error.response);
      alert(error.response?.data?.message || "Gagal menambahkan pengguna. Silakan coba lagi.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-300
        ${isOpen ? "scale-100" : "scale-90"}`}
      >
        <h2 className="text-lg font-bold mb-4">Tambah Pengguna</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama"
            className="border p-2 rounded w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Isi Email"
            className="border p-2 rounded w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Isi Password"
            className="border p-2 rounded w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="border p-2 rounded w-full"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Siswa">Siswa</option>
            <option value="Admin">Admin</option>
          </select>
          <textarea
            name="alamat"
            placeholder="Alamat"
            className="border p-2 rounded w-full"
            value={formData.alamat}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />

          {/* Preview Gambar (Opsional) */}
          {formData.photo && (
            <img
              src={URL.createObjectURL(formData.photo)}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#3674B5] hover:bg-[#1B4B82] text-white px-4 py-2 rounded"
            >
              Tambah Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
