import React, { useEffect, useState } from "react";
import api from "../../api";

export default function CompanyJobsList() {
  const [jobs, setJobs] = useState([]);
  const company = JSON.parse(localStorage.getItem("company"));

  const fetchJobs = async () => {
    try {
      const res = await api.get(`/companies/${company._id}/jobs`);
      setJobs(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  const deactivateJob = async (id) => {
    if (!window.confirm("Voulez-vous désactiver ce job ?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">Mes Jobs</h2>
      {jobs.length === 0 ? (
        <p>Aucune offre pour l'instant.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.city}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => deactivateJob(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Désactiver
                </button>
                <button
                  onClick={() => window.location.href = `/company/job/${job._id}`}
                  className="bg-[#FFB000] text-white px-3 py-1 rounded hover:bg-[#e09a00]"
                >
                  Détails
                </button>
                <button
                  onClick={() => window.location.href = `/company/job/${job._id}/applications`}
                  className="bg-[#FFB000] text-white px-3 py-1 rounded hover:bg-[#e09a00]"
                >
                  طلبات التوظيف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
