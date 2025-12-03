import React, { useEffect, useState } from "react";
import api from "../api";

export default function DriverJobsList() {
  const [jobs, setJobs] = useState([]);
  const driver = JSON.parse(localStorage.getItem("driver")); // بيانات السائق

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs"); // جلب جميع الوظائف
      setJobs(res.data.filter(job => job.isActive)); // فقط الوظائف النشطة
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      await api.post("/applications", {
        driverId: driver._id,
        jobId
      });
      alert("تم تقديم الطلب بنجاح !");
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">جميع الوظائف</h2>
      {jobs.length === 0 ? (
        <p>لا توجد وظائف متاحة.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job._id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.city}</p>
              </div>
              <button
                onClick={() => applyToJob(job._id)}
                className="bg-[#FFB000] text-white px-3 py-1 rounded hover:bg-[#e09a00]"
              >
                قدم الطلب
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
