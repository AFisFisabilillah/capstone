import React from "react";

const Login = () => {
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
          <p className="text-gray-600 mb-6 text-center">
            Silahkan login untuk melanjutkan
          </p>

          <form className="space-y-6">
            {/* Input Username */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#3674B5]"
            />

            {/* Input Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#3674B5]"
            />

            {/* Tombol Login */}
            <button className="w-full bg-[#3674B5] text-white py-3 rounded hover:bg-[#1B4B82] transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
