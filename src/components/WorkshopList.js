import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";
import ExportToExcel from "./ExportToExcel";
export default function WorkshopList() {
  const [data, setData] = useState([]);
  const [workshopId, setWorkshopId] = useState(null);
  //const [hostCollege, setHostCollege] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const response = await axios.post(
        "/admin/workshop-registration-list",
        {
          workshopId: parseInt(workshopId),
          //hostCollege: hostCollege,
          //paymentStatus: paymentStatus,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
      setFilteredData(response.data.data);
      console.log(response.data.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: error.response.data.error,
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setPaymentStatus(status);
    if (status === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.status === status));
    }
  };

  return (
    <>
      <div className="flex flex-row items-center mx-10 my-5">
        <p className="text-xl font-bold mr-5">Select Workshop: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setWorkshopId(e.target.value)}
        >
          <option disabled selected>
            --Select--
          </option>
            "1": "Cloud Computing Essentials in the Era of AI",
            "2": "Mastering MCP - Building Context-Aware AI Apps"
          <option value={1}>
            Cloud Computing Essentials in the Era of AI
          </option>
          <option value={2}>
            Mastering MCP - Building Context-Aware AI Apps
          </option>
          <option value={0}>BULK REGISTER (Both Workshops)</option>
          {/* <option value={3}>Linux Networking Essentials</option> */}
        </select>
      </div>
      {/* <div className="flex flex-row items-center mx-10 my-5">
        <p className="text-xl font-bold mr-5">Select Host College: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          //onChange={(e) => setHostCollege(e.target.value)}
        >
          <option disabled selected>
            --Select--
          </option>
          <option
            value={
              "J.J. College of Engineering and Technology, Tiruchirappalli"
            }
          >
            J.J. College of Engineering and Technology,Tiruchirappalli
          </option>
        </select>
      </div> */}
      <div className="flex flex-row items-center mx-10 my-5">
        <p className="text-xl font-bold mr-5">Select Payment Status: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILURE">Failure</option>
        </select>
      </div>
      <button
        className="cursor-pointer ml-10 px-4 py-2 tracking-wide text-white font-bold bg-gradient-to-r from-[#702b2b] via-[#9d0505] to-[#8a1818] rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 transform hover:scale-105 active:scale-95"
        onClick={fetchData}
      >
        Fetch
      </button>
      {filteredData.length !== 0 && (
        <div className="overflow-x-auto">
          <ExportToExcel
            apiData={filteredData}
            fileName={`Workshop_${workshopId}_2025`}
          />
          <table className="table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>AbacusId</th>
                <th>Name</th>
                <th>College</th>
                <th>Email</th>
                {(parseInt(workshopId) === 1 || parseInt(workshopId) === 2) && (
                  <th>Paymentstatus</th>
                )}
                <th>Mobile</th>
                <th>Dept</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {(filteredData || []).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.abacusId}</td>
                  <td>{item.name}</td>
                  <td>{item.college}</td>
                  <td>{item.email}</td>
                  {item.status && <td>{item.status}</td>}
                  <td>{item.mobile}</td>
                  <td>{item.dept}</td>
                  <td>{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
