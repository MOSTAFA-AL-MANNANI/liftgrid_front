import React, { useEffect, useState } from "react";
import NavbarDriver from "./navbarDriver";
import api from "../api";
import { FiBriefcase, FiCheckCircle, FiXCircle, FiClock, FiMapPin, FiDollarSign } from "react-icons/fi";

export default function Dashbord() {
  const [applications, setApplications] = useState([]);
  const driver = JSON.parse(localStorage.getItem("driver"));

  const fetchApplications = async () => {
    try {
      const res = await api.get(`/drivers/${driver._id}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const countStatus = (status) => applications.filter(app => app.status === status).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">


      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#FFB000]">Bienvenue {driver?.fullName}</h1>
        <p className="text-gray-300 mb-8">
          Ici, vous pouvez suivre vos candidatures, vos statistiques et gérer vos informations.
        </p>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center">
            <FiBriefcase className="text-4xl text-[#FFB000] mb-2" />
            <h2 className="text-2xl font-bold">{applications.length}</h2>
            <p className="text-gray-300 mt-1">Total des candidatures</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center">
            <FiCheckCircle className="text-4xl text-green-500 mb-2" />
            <h2 className="text-2xl font-bold">{countStatus("accepted")}</h2>
            <p className="text-gray-300 mt-1">Acceptées</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center">
            <FiXCircle className="text-4xl text-red-500 mb-2" />
            <h2 className="text-2xl font-bold">{countStatus("rejected")}</h2>
            <p className="text-gray-300 mt-1">Refusées</p>
          </div>
        </div>

        {/* Liste des candidatures */}
        <h2 className="text-3xl font-bold text-[#FFB000] mb-4">Mes candidatures</h2>
        {applications.length === 0 ? (
          <p className="text-gray-400">Vous n'avez postulé à aucune offre pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app._id} className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-md hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold mb-1">{app.job?.title}</h3>
                <p className="text-gray-300 mb-1">Entreprise: {app.job?.company?.name || "Non spécifié"}</p>
                <p className="text-gray-300 mb-1">📍 {app.job?.city}</p>
                {app.job?.salary && <p className="text-gray-300 mb-1">💰 {app.job.salary} MAD</p>}
                {app.job?.experienceRequired && <p className="text-gray-300 mb-1">🎯 {app.job.experienceRequired} ans</p>}
                <p className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  app.status === "pending" ? "bg-gray-500" : app.status === "accepted" ? "bg-green-600" : "bg-red-600"
                }`}>
                  {app.status === "pending" ? "En attente" : app.status === "accepted" ? "Acceptée" : "Refusée"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
