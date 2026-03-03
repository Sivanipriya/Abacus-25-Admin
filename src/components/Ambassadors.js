import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Ambassadors = () => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const res = await axios.get("/admin/ambassadors");
        setAmbassadors(res.data.ambassadors);
      } catch (error) {
        console.error("Error fetching ambassadors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmbassadors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading ambassadors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Student Ambassadors</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-[#9d0505]">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">College</th>
              <th className="p-3">Referral Code</th>
              <th className="p-3">Eligible</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {ambassadors.map((amb) => (
              <tr
                key={amb.id}
                className="border-t border-gray-700 text-center hover:bg-[#1a1a1a]"
              >
                <td className="p-3">{amb.name}</td>
                <td className="p-3">{amb.email}</td>
                <td className="p-3">{amb.college}</td>
                <td className="p-3 font-mono">{amb.referralCode}</td>
                <td className="p-3">
                  {amb.isEligible ? "✅" : "❌"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/ambassador/${amb.referralCode}`)
                    }
                    className="bg-red-700 px-4 py-1 rounded hover:bg-red-800"
                  >
                    View Stats
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ambassadors;
