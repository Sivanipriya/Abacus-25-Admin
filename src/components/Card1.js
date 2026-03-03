import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";
const Abacus_BASE_URL = "https://api.abacus.org.in";
//const Abacus_BASE_URL = `http://localhost:3001`;
const Card1 = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

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
          "/admin/workshop-payment-success",
          {
            transactionId: data.transactionId,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        Swal.close();
        window.location.reload();
        await Swal.fire({
          title: "Verification successful",
          icon: "success",
          timer: 3000,
        });
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

  const declinePayment = async (e) => {
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
          "/admin/workshop-payment-failure",
          {
            transactionId: data.transactionId,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        Swal.close();
        window.location.reload();
        await Swal.fire({
          title: "Verification successful",
          icon: "success",
          timer: 4000,
        });
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
        name="my-accordion-2"
        checked={isOpen}
        onChange={toggleAccordion}
      />
      <div
        className="collapse-title text-xl font-medium z-0"
        onClick={toggleAccordion}
      >
        {data.users[0].abacusId + "   " + data.users[0].name}
      </div>
      {isOpen && (
        <div className="collapse-content">
          <div className="card w-full bg-neutral text-neutral-content m-0">
            <div className="card-body items-center text-center">
              <figure className="px-0 pt-10">
                <img
                  src={`${Abacus_BASE_URL}/images/${data.screenshot}`}
                  //src={`${Abacus_BASE_URL}/images/${data.screenshot}`}
                  width="100px"
                  onClick={() =>
                    document
                      .getElementById(`modal_${data.transactionId}`)
                      .showModal()
                  }
                  alt="Screenshot"
                  className="rounded-xl"
                />
              </figure>
              <table className="border-collapse border border-slate-500">
                <tbody>
                  {/* <tr>
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
                  </tr> */}
                  <tr>
                    <td className="border p-2">Workshop Name</td>
                    <td className="border p-2">{data.workshopName}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Transaction Id</td>
                    <td className="border p-2">{data.transactionId}</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Payment Mobile</td>
                    <td className="border p-2">{data.paymentMobile}</td>
                  </tr>
                  {/* <tr>
                    <td className="border p-2">Host College</td>
                    <td className="border p-2">{data.users[0].hostCollege}</td>
                  </tr> */}
                  {(data.users || []).map((user) => {
                    return (
                      <tr>
                        <td className="border p-2">User</td>
                        <td className="border p-2">
                          {user.name} <br />
                          {user.abacusId} <br />
                          {user.mobile}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={verifyPayment}>
                  Accept
                </button>
                <button className="btn btn-ghost" onClick={declinePayment}>
                  Deny
                </button>
              </div>
            </div>
          </div>
          <dialog id={`modal_${data.transactionId}`} className="modal">
            <div className="modal-box">
              <img
                src={`${Abacus_BASE_URL}/images/${data.screenshot}`}
                //src={`${Abacus_BASE_URL}/images/${data.screenshot}`}
                alt="Screenshot"
                className="rounded-xl"
              />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Card1;
