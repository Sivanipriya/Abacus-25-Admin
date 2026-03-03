import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";
export default function RegisterNewUser() {
  const [data, setData] = useState({
    email: "",
    name: "",
    mobile: "",
    year: "",
    dept: "",
    college: "",
    password: "",
    // accomodation: "",
    referralCode: "",
  });
  const handleSelectChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    if (
      data.email === "" ||
      data.password === "" ||
      data.year === 0 ||
      data.name === "" ||
      data.mobile === "" ||
      data.dept === "" ||
      data.college === ""
      // data.accomodation === "" 
    ) {
      setError("Please enter a valid username and password");
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verified",
    });
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        const response = await axios.post(
          "/admin/register-user",
          {
            name: data.name.toString(),
            email: data.email.toString(),
            mobile: data.mobile.toString(),
            password: data.password.toString(),
            year: parseInt(data.year),
            dept: data.dept.toString(),
            college: data.college.toString(),
            // accomodation: data.accomodation,
            referralCode: data.referralCode,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        Swal.close();
        Swal.fire({
          title: "User registered successfully",
          text: "Abacus ID: " + response.data.data.abacusId,
          icon: "success",
        });
      } catch (error) {
        Swal.close();
        Swal.fire({
          title: error.response.data.error,
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black text-white">
      <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Register New User
        </h2>
        <form className="mt-6 flex flex-col items-center">
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Year:</label>
            <input
              type="number"
              name="year"
              value={data.year}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Department:</label>
            <input
              type="text"
              name="dept"
              value={data.dept}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">College:</label>
            <input
              type="text"
              name="college"
              value={data.college}
              onChange={handleChange}
              className="input w-full max-w-xs input-bordered text-red-800"
              required
            ></input>
            <br></br>
          </div>
          {/* <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2">Accodomation:</label>
            <select
              placeholder="Do you need Accodomation in CEG?"
              className="input w-full max-w-xs input-bordered text-red-800"
              value={
                data.accomodation === true
                  ? "true"
                  : data.accomodation === false
                  ? "false"
                  : ""
              }
              onChange={(e) =>
                handleSelectChange(
                  "accomodation",
                  e.target.value === "true"
                    ? true
                    : e.target.value === "false"
                    ? false
                    : null
                )
              }
              required
            >
              <option value="" disabled hidden>
                Do you need Accodomation in CEG?
              </option>
              <option key="Yes" value="true">
                Accomodation required
              </option>
              <option key="No" value="false">
                Accomodation not required
              </option>
            </select>
            <br></br>
          </div> */}

          {/* <div className='mb-2 w-64 sm:w-64 md:w-64 lg:w-80'>
                        <label className='text-sm font-semibold mb-2'>Host College:</label><br></br>
                        <select className="select select-bordered w-full max-w-xs text-red-800" name='hostCollege' type='text' onChange={handleChange}>
                            <option disabled selected>--Select--</option>
                            <option value={"J.J. College of Engineering and Technology, Tiruchirappalli"}>"J.J. College of Engineering and Technology, Tiruchirappalli</option>
                        </select>
                    </div>*/}
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2 "> referralCode: </label>
            <input
              type="text"
              name="referralCode"
              placeholder="referralCode (optional)"
              className="input w-full  text-red-800 max-w-xs input-bordered"
              value={data.referralCode}
              onChange={handleChange}
            />
            <br></br>
          </div>
          <div className="mb-2 w-64 sm:w-64 md:w-64 lg:w-80">
            <label className="text-sm font-semibold mb-2 ">Password: </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="input w-full  text-red-800 max-w-xs input-bordered"
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
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
