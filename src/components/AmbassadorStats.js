import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const StatCard = ({ title, value }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const AmbassadorStats = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `/admin/ambassador/${referralCode}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [referralCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading stats...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-lg">No data found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { ambassador, stats } = data;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-white mb-6"
      >
        ← Back
      </button>

      {/* Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-10">
        <h1 className="text-3xl font-bold mb-4">
          {ambassador.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <p>
            <span className="text-zinc-400">Email:</span>{" "}
            {ambassador.email}
          </p>
          <p>
            <span className="text-zinc-400">College:</span>{" "}
            {ambassador.college}
          </p>
          <p>
            <span className="text-zinc-400">Referral Code:</span>{" "}
            <span className="font-mono bg-black px-2 py-1 rounded">
              {ambassador.referralCode}
            </span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <h2 className="text-2xl font-semibold mb-6">
        Ambassador Stats
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xl">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Events Participations" value={stats.freeEvents} />
        <StatCard title="Workshops Participations" value={stats.workshops} />
        <StatCard title="Total Activity" value={stats.totalActivity} />
      </div>
    </div>
  );
};

export default AmbassadorStats;
