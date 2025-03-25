const UserFormModal = ({ isOpen, onClose, onSubmit }) => {
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
        <form onSubmit={onSubmit} className="grid gap-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            required
          />
          <select name="status" className="border p-2 rounded w-full">
            <option value="Siswa">Siswa</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="textarea"
            name="alamat"
            placeholder="Alamat"
            className="border p-2 rounded w-full"
            required
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
              Tambah Pengguna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
