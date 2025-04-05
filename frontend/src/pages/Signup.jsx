import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        username,
        email,
        password,
      });

      // Cek jika response berisi token atau pesan sukses
      if (response.data.token) {
        // Menyimpan data username, email, dan password di localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        
        alert(response.data.message);  // Tampilkan pesan sukses
        navigate("/login");  // Redirect ke halaman login setelah sukses
      } else {
        setError(response.data.message || "Terjadi kesalahan. Coba lagi");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar. Coba lagi");
    }
  };

  return (
    <div className="flex h-screen bg-[#3674B5]">
      {/* Bagian Kiri (Logo) */}
      <div className="w-1/2 flex justify-center items-center">
        <h1 className="text-white text-5xl font-bold">LOGO</h1>
      </div>

      {/* Bagian Kanan (Form Login) */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm h-[500px] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-black text-center">
            Selamat Datang !
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Silahkan buat akun untuk melanjutkan
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Input Username */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#3674B5]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Input Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#3674B5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Input Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#3674B5]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Tombol Signup */}
            <button
              type="submit"
              className="w-full bg-[#3674B5] text-white py-3 rounded hover:bg-[#1B4B82] transition"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
