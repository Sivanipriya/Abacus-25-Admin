import React, { useState } from "react";
import Card2 from "./Card2Events";
import Swal from "sweetalert2";
import axios from "../api/axios";
const EventCashPayment = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("abacusId");
  const [filterData, setFilterData] = useState("");
  const [EventId, setEventId] = useState(null);
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
        "/admin/Event-unpaid",
        {
          EventId: parseInt(EventId),
          //hostCollege: hostCollege,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.usersWithoutPayments);
      setFilteredData(response.data.usersWithoutPayments);
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
        <p className="text-xl font-bold mr-5">Select Event: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setEventId(e.target.value)}
        >
          <option disabled selected>
            --Select--
          </option>
          <option value={1}>OSPC</option>
          <option value={2}>BYTE BEGIN</option>
          <option value={3}>BRAINWAVE.ML</option>
          <option value={4}>CTRL+ESCAPE</option>
          <option value={5}>READY.SET.HIRE!</option>
          <option value={6}>GLITCH SNITCH</option>
          <option value={7}>ACM Special</option>
          <option value={8}>CSAU Special</option>
          <option value={9}>TREASURE HUNT</option>
          <option value={10}>IPL AUCTION</option>
          <option value={11}>CHATGPT PULSE</option>
          <option value={12}>Checkmate Chronicles</option>
          <option value={13}>Collab with Quizzers Anonymous</option>
          <option value={14}>OLPC</option>
          <option value={15}>LIGHTS, CAMERA, REEL!</option>
          <option value={16}>WAR OF THE RACKETS</option>
          <option value={17}>Grand Cricket League (GCL)</option>
          <option value={18}>
            CSEA SUPER LEAGUE (CSL) - Kick, Pass, Goal!
          </option>
          <option value={21}>
            Neonova - AU IEEE Computer Society's Ideathon
          </option>
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
      {data?.length !== 0 && (
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
          {(filteredData || []).map((d) => (
            <Card2
              data={d}
              eventId={EventId}
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

export default EventCashPayment;
