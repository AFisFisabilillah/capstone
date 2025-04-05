const EditUserFormModal = ({ isOpen, onClose, onSubmit, user }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-300
        ${isOpen ? "scale-100" : "scale-90"}`}
      >
        <h2 className="text-lg font-bold mb-4">Edit Pengguna</h2>
        <form onSubmit={onSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            defaultValue={user?.name || ""}
            placeholder="Nama"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="password"
            name="password"
            defaultValue={user?.password || ""}
            placeholder="Password"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="email"
            defaultValue={user?.email || ""}
            placeholder="Email"
            className="border p-2 rounded w-full"
            required
          />
          <select
            name="role"
            className="border p-2 rounded w-full"
            defaultValue={user?.role || "Siswa"}
          >
            <option value="Siswa">Siswa</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            name="alamat"
            defaultValue={user?.alamat || ""}
            placeholder="Alamat"
            className="border p-2 rounded w-full"
            required
          />
          <input
          type="file"
          name="photo"
          onChange={(e) => setFormData({
             ...formData,
          photo: e.target.files[0]  // langsung ambil File
            })}
/>

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
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserFormModal;
