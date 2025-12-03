import React, { useEffect, useState } from "react";
import api from "../../api";

export default function CompanyApplicationsList() {
  const [applications, setApplications] = useState([]);
  const company = JSON.parse(localStorage.getItem("company"));

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/companies/${company._id}/applications`);
      setApplications(res.data);
      console.log(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold text-[#FFB000] mb-4">
        طلبات التوظيف الخاصة بالشركة
      </h2>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{app.job.title}</h3>
            <p>السائق: {app.driver.fullname}</p>
            <p className="text-gray-500">الهاتف: {app.driver.phone}</p>

            <p
              className={`mt-1 font-semibold ${
                app.status === "pending"
                  ? "text-gray-500"
                  : app.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              الحالة: {app.status}
            </p>
              <button onClick={() => window.location.href = `/company/application/${app._id}/update-status`}>تحديث الحالة</button>
          </div>
        ))}
      </div>

    </div>
  );
}
