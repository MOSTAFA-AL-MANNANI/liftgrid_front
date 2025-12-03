import React, { useEffect, useState } from "react";
import api from "../api";

export default function DriverApplicationsStatus() {
  const [applications, setApplications] = useState([]);
  const driver = JSON.parse(localStorage.getItem("driver"));

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/drivers/${driver._id}/applications`);
      setApplications(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">حالة الطلبات</h2>
      {applications.length === 0 ? (
        <p>لم تقدم أي طلبات بعد.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map(app => (
            <li key={app._id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{app.job.title}</h3>
                <p className="text-gray-600">المدينة: {app.job.city}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-white ${
                  app.status === "pending" ? "bg-gray-500" :
                  app.status === "accepted" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
