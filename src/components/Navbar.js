import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    await Swal.fire({ title: "Logged Out Successfully", icon: "success" });
    navigate("/");
  };
  return (
    <div>
      <div className="navbar bg-gradient-to-b from-[#702b2b] via-[#9d0505] to-[#8a1818] shadow-lg z-50 border-b-2 text-white border-b-gray-600">
        <div className="navbar-start">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52 bg-black"
            >
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/register-user">Register New User</a>
              </li>
              <li>
                <a href="/register-ca">Register Campus Ambassador</a>
              </li>
              <li>
                <a href="/verify-workshop-payment">Verify workshop Payments</a>
              </li>
              <li>
                <a href="/verify-event-payment">Verify event Payments</a>
              </li>
              <li>
                <a href="/workshop-cash-payment">Workshop Cash Payment</a>
              </li>
              <li>
                <a href="/event-cash-payment">Event Cash Payment</a>
              </li>
              <li>
                <a href="/add-admin">Add Admin</a>
              </li>
              <li>
                <a href="/change-password">Change Password</a>
              </li>
              <li>
                <a href="/workshop-list">Workshop Registration List</a>
              </li>
              <li>
                <a href="/event-list">Event Registration List</a>
              </li>
              <li>
                <a href="/workshop-payments">Workshop Payments</a>
              </li>
              <li>
                <a href="/event-payments">Event Payments</a>
              </li>
              <li>
                <a href="/queries">Queries</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl" href="/dashboard">
            Abacus'25 Admin
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
