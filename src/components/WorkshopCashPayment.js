import React, { useState } from "react";
import Card2 from "./Card2";
import Swal from "sweetalert2";
import axios from "../api/axios";
const WorkshopCashPayment = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("abacusId");
  const [filterData, setFilterData] = useState("");
  const [workshopId, setWorkshopId] = useState(null);
  //const [hostCollege, setHostCollege] = useState("");
  const handleFilterDataChange = (e) => {
    const newFilterData = e.target.value.toLowerCase();
    setFilterData(newFilterData);
    if (filter !== "") {
      const tempData = data.filter((d) =>
        d[filter.toString()].toString().toLowerCase().startsWith(newFilterData)
      );
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  };
  const fetchData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const response = await axios.post(
        "/admin/workshop-unpaid",
        {
          workshopId: parseInt(workshopId),
          //hostCollege: hostCollege,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
      setFilteredData(response.data.data);
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
          <option value={1}>Emergence of AI Engineers and Evolution of Vibe coding</option>
          <option value={2}>API & Kubernetes: The Dynamic Duo of Modern Tech</option>
          <option value={3}>Linux Networking Essentials</option>
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
              "J.J. College of Engineering and Technology, Tiruchirappalli"
            }
          >
            J.J. College of Engineering and Technology,Tiruchirappalli
          </option>
        </select>
      </div> */}
      <button
        className="btn btn-primary ml-10 cursor-pointer px-4 py-2 tracking-wide text-white font-bold bg-gradient-to-r from-[#702b2b] via-[#9d0505] to-[#8a1818] rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 transform hover:scale-105 active:scale-95"
        onClick={fetchData}
      >
        Fetch
      </button>
      {data.length !== 0 && (
        <div className="p-5">
          <div className="flex flex-row items-center">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => setFilter("abacusId")}>
                    Abacus Id
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("mobile")}>
                    Mobile Number
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("name")}>Name</button>
                </li>
                <li>
                  <button onClick={() => setFilter("email")}>Email</button>
                </li>
              </ul>
            </div>
            <input
              type="text"
              placeholder={
                filter === ""
                  ? `Select filter and type here`
                  : `Type ${filter} Here`
              }
              className="input input-bordered w-full"
              value={filterData}
              onChange={handleFilterDataChange}
            />
          </div>
          {(filteredData||[]).map((d) => (
            <Card2
              data={d}
              workshopId={workshopId}
              fullData={data}
              setData={setData}
              fullFilteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default WorkshopCashPayment;
