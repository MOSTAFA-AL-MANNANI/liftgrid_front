import React, { useEffect, useState } from "react";
import api from "../api";

export default function DriverJobsList() {
  const [jobs, setJobs] = useState([]);
  const driver = JSON.parse(localStorage.getItem("driver"));

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.filter((job) => job.isActive));
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
      <h2 className="text-3xl font-bold text-[#FFB000] mb-6">جميع الوظائف المتاحة</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-lg">لا توجد وظائف متاحة حالياً.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              {/* عنوان الوظيفة */}
              <h3 className="text-xl font-bold mb-2 text-gray-900">{job.title}</h3>

              {/* اسم الشركة */}
              <p className="text-gray-700 text-sm font-semibold mb-1">
                الشركة: <span className="text-[#FFB000]">{job.company?.name}</span>
              </p>

              {/* المدينة */}
              <p className="text-gray-600 mb-1">📍 {job.city}</p>

              {/* الراتب */}
              {job.salary && (
                <p className="text-gray-700 mb-1">
                  💰 الراتب: <strong>{job.salary} درهم</strong>
                </p>
              )}

              {/* الخبرة المطلوبة */}
              {job.experienceRequired && (
                <p className="text-gray-700 mb-1">
                  🎯 الخبرة المطلوبة: {job.experienceRequired} سنوات
                </p>
              )}

              {/* وصف مختصر */}
              <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                {job.description}
              </p>

              {/* زر التقديم */}
              <button
                onClick={() => applyToJob(job._id)}
                className="mt-4 w-full bg-[#FFB000] text-white py-2 rounded-lg font-semibold hover:bg-[#e09a00] transition"
              >
                قدم الطلب
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
