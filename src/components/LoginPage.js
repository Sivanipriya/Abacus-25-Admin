import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/login", {
        email: data.email.toString(),
        password: data.password.toString(),
      });

      console.log("API Response:", response);
      Swal.close();
      Swal.fire({ title: "Login Successful", icon: "success" });

      // Ensure you access `data` properly
      const token = response.data?.token;
      console.log("Token:", token);

      login(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Response:", error.response); // Log full error details
      Swal.close();
      Swal.fire({
        title: error.response?.data?.error || "Error",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black text-white">
      <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold">Login</h2>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold ">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              rquired
            ></input>
            <br></br>
          </div>
          <div>
            <label className="block text-sm font-semibold ">Password: </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            ></input>
            <br></br>
          </div>
          {error && <div className="text-orange-500 font-serif">{error}</div>}
          <div className="mt-6">
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              className="cursor-pointer w-full px-4 py-2 tracking-wide text-white font-bold bg-gradient-to-r from-[#702b2b] via-[#9d0505] to-[#8a1818] rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 transform hover:scale-105 active:scale-95"
              style={{
                boxShadow:
                  "0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(138, 43, 226, 0.6)",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
