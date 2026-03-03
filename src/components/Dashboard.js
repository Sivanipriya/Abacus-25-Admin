import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    // { title: "Register New User", path: "/register-user" },
    // { title: "Register Campus Ambassador", path: "/register-ca" },

    { title: "View Ambassadors", path: "/ambassadors" },

    { title: "Workshop Registrations", path: "/workshop-list" },
    { title: "Event Registrations", path: "/event-list" },

    { title: "Verify Workshop Payments", path: "/verify-workshop-payment" },
    // { title: "Verify Event Payments", path: "/verify-event-payment" },

    { title: "Workshop Payments", path: "/workshop-payments" },
    // { title: "Event Payments", path: "/event-payments" },

    { title: "Queries", path: "/queries" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-10 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold">Hello Admin 👋</h1>
        <p className="mt-4 text-lg text-gray-300">
          Welcome to Abacus '25
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-gradient-to-br from-[#702b2b] via-[#9d0505] to-[#8a1818]
           rounded-2xl p-8 sm:p-6 text-center shadow-lg
           active:scale-95 hover:scale-105 transition-transform duration-200"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-200">
              Click to manage
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
