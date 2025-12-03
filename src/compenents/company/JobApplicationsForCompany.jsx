import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

export default function JobApplicationsForCompany() {
  const [applications, setApplications] = useState([]);
    const { id } = useParams();
  const fetchJobApplications = async () => {
    try {
      const res = await api.get(`/jobs/${id}/applications`);
      setApplications(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">
        الطلبات على هذه الوظيفة
      </h2>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="p-4 border rounded-lg">

            <h3 className="font-bold">{app.driver.name}</h3>
            <p className="text-gray-500">{app.driver.email}</p>

            <span
              className={`font-semibold ${
                app.status === "pending"
                  ? "text-gray-500"
                  : app.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {app.status}
            </span>

          </div>
        ))}
      </div>

    </div>
  );
}
