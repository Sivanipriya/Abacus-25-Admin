import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios"; // Adjust path based on your structure

export default function RegisterCampusAmbassador() {
  const [data, setData] = useState({
    name: "",
    email: "",
    college: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.college) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in all the fields.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are registering as Campus Ambassador",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Register Me!",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Registering...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => Swal.showLoading(),
        });

        const response = await axios.post("/admin/register-ca", data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        }); // ✅ Update with correct backend endpoint

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Registered Successfully!",
          text: response.data.message || "Thanks for registering!",
        });

        setData({
          name: "",
          email: "",
          college: "",
        });
      } catch (error) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: error.response?.data?.error || "Registration Failed",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black gradient-to-br from-gray-100 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Campus Ambassador Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input input-bordered w-full text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email ID</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full text-black"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">College Name</label>
            <input
              type="text"
              name="college"
              value={data.college}
              onChange={handleChange}
              placeholder="Enter your college name"
              className="input input-bordered w-full text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
