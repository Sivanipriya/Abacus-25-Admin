import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";

const Card2 = ({
  data,
  workshopId,
  fullData,
  setData,
  fullFilteredData,
  setFilteredData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  //console.log(data, workshopId, fullData, setData, fullFilteredData);
  const verifyPayment = async (e) => {
    e.preventDefault();
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
        await axios.post(
          "/admin/workshop-cash-payment",
          {
            users: [data.id],
            workshopId: parseInt(workshopId),
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        Swal.close();
        setData(fullData.filter((d) => d.id !== data.id));
        setFilteredData(fullFilteredData.filter((d) => d.id !== data.id));
        await Swal.fire({ title: "Verification successful", icon: "success" });
      } catch (error) {
        Swal.close();
        await Swal.fire({
          title: error.response.data.error,
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div
        className="collapse-title text-md font-medium z-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {data.abacusId + "  " + data.name}
      </div>
      {isOpen && (
        <div className="collapse-content !p-0">
          <div className="card card-compact w-[95%] mx-auto bg-neutral text-neutral-content p-0">
            <div className="card-body items-center text-center">
              <div className="overflow-x-auto">
                <table className="table border-collapse border border-slate-500">
                  <tbody>
                    <tr>
                      <td className="border p-2">AbacusId</td>
                      <td className="border p-2">{data.abacusId}</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Name</td>
                      <td className="border p-2">{data.name}</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Mobile</td>
                      <td className="border p-2">{data.mobile}</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Email</td>
                      <td className="border p-2">{data.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={verifyPayment}>
                  Cash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card2;
