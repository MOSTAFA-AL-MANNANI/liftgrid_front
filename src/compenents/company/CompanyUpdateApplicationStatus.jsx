import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

export default function CompanyUpdateApplicationStatus() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  console.log(id);

  const fetchApplication = async () => {
    try {
      const res = await api.get(`/applications/${id}`);
      setApplication(res.data);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      alert("تم تحديث الحالة");
      fetchApplication();
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  if (!application) return <p>جار التحميل...</p>;

  return (
    <div className="p-6 border rounded-lg">

      <h3 className="text-xl font-bold mb-2">{application.job.title}</h3>

      <p>السائق: {application.driver.name}</p>

      <p className="font-bold mt-2">الحالة الحالية: {application.status}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => updateStatus("accepted")}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          قبول
        </button>

        <button
          onClick={() => updateStatus("rejected")}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          رفض
        </button>
      </div>

    </div>
  );
}
