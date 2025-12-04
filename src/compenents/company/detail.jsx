import React, { useEffect, useState } from "react";
import api from "../../api"; // ⬅️ يجب أن يكون ملف API مُعد مسبقًا

export default function CompanyDetail() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // الحصول على الـ ID من localStorage أو من props
    const stored = localStorage.getItem("company");
    if (!stored) return;

    const comp = JSON.parse(stored);

    api.get(`/companies/${comp._id}`)
      .then(res => setCompany(res.data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  if (!company) {
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl border border-[#FFB000]">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
          {/* Logo */}
          {company.logo && company.logo.data ? (
            <img
              src={`data:${company.logo.contentType};base64,${company.logo.data}`}
              alt="Company Logo"
              className="w-32 h-32 rounded-full border-2 border-[#FFB000] object-cover mb-4 md:mb-0"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-2 border-[#FFB000] flex items-center justify-center text-gray-400 mb-4 md:mb-0">
              No Logo
            </div>
          )}

          {/* Infos */}
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-[#FFB000]">{company.name}</h2>
            <p><span className="font-semibold">RC Number:</span> {company.rcNumber}</p>
            <p><span className="font-semibold">Email:</span> {company.email}</p>
            <p><span className="font-semibold">Phone:</span> {company.phone}</p>
            <p><span className="font-semibold">City:</span> {company.city}</p>
            <p><span className="font-semibold">Description:</span> {company.description || "N/A"}</p>
            <p><span className="font-semibold">Active:</span> {company.isActive ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Created at: {new Date(company.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
