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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-500";
      case "accepted":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const downloadFile = (driverId, type) => {
    window.open(`/drivers/${driverId}/${type}`, "_blank");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#FFB000] mb-6">حالة الطلبات</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-lg">لم تقدم أي طلبات بعد.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-5 bg-white border rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Job info */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {app.job?.title}
              </h3>
              <p className="text-gray-600 mb-1 font-medium">
                الشركة: {app.job?.company?.name || "غير محدد"}
              </p>
              <p className="text-gray-700 mb-1">📍 المدينة: {app.job?.city}</p>
              {app.job?.salary && (
                <p className="text-gray-700 mb-1">💰 الراتب: {app.job.salary} درهم</p>
              )}
              {app.job?.experienceRequired && (
                <p className="text-gray-700 mb-1">🎯 الخبرة المطلوبة: {app.job.experienceRequired} سنوات</p>
              )}
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">{app.job?.description}</p>

              {/* Status badge */}
              <span
                className={`mt-4 inline-block px-4 py-1 rounded-full text-white font-semibold text-sm ${getStatusBadge(app.status)}`}
              >
                {app.status === "pending"
                  ? "في الانتظار"
                  : app.status === "accepted"
                  ? "مقبول"
                  : "مرفوض"}
              </span>

              {/* Applied date */}
              <p className="text-gray-500 text-xs mt-2">
                📅 تاريخ التقديم: {new Date(app.appliedAt).toLocaleDateString()}
              </p>

              {/* Driver files */}
              <div className="mt-4 flex gap-2 flex-wrap">
                {app.driver?.cv && (
                  <button
                    onClick={() => downloadFile(app.driver._id, "cv")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300 text-sm"
                  >
                    تحميل CV
                  </button>
                )}
                {app.driver?.certifications && (
                  <button
                    onClick={() => downloadFile(app.driver._id, "certifications")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300 text-sm"
                  >
                    تحميل الشهادات
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
