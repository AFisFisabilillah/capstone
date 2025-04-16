import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginuser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email,
        password,
      });

      console.log("Response dari server:", response.data);
      const token = response.data.data?.token;


      if (token) {
        localStorage.setItem("token", token);
        console.log("Token berhasil disimpan:", token);
        navigate("/"); // Redirect ke dashboard setelah login sukses
      } else {
        setError("Token tidak ditemukan dalam response");
        console.error("Token undefined, respons server:", response.data);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Email atau password salah");
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
            Silahkan login untuk melanjutkan
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Input email */}
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

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#3674B5] text-white py-3 rounded hover:bg-[#1B4B82] transition">
              Login
            </button>
            <p className="text-gray-600 mb-4 text-center">
              Apakah Anda Admin? <a href="Login">Masuk</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginuser;
