import React, { useEffect, useState } from "react";
import api from "../../api";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiFileText,
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiDownload,
  FiEye,
  FiRefreshCw
} from "react-icons/fi";

export default function CompanyApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const company = JSON.parse(localStorage.getItem("company"));

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/companies/${company._id}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const viewCV = (driverId) => {
    window.open(`${api.defaults.baseURL}/drivers/${driverId}/cv`, "_blank");
  };

  const viewCertif = (driverId) => {
    window.open(
      `${api.defaults.baseURL}/drivers/${driverId}/certifications`,
      "_blank"
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'accepted': return <FiCheckCircle className="mr-2" />;
      case 'rejected': return <FiXCircle className="mr-2" />;
      case 'pending': return <FiLoader className="mr-2" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Rejetée';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des candidatures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Candidatures <span className="text-[#FFB000]">reçues</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Gérez et suivez toutes les candidatures pour vos offres d'emploi
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={fetchApplications}
                className="flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105"
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
                Actualiser la liste
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total des candidatures</p>
                  <p className="text-3xl font-bold text-white mt-2">{applications.length}</p>
                </div>
                <div className="text-[#FFB000] text-3xl">
                  <FiBriefcase />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">En attente</p>
                  <p className="text-3xl font-bold text-yellow-400 mt-2">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
                <div className="text-yellow-400 text-3xl">
                  <FiLoader />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Acceptées</p>
                  <p className="text-3xl font-bold text-green-400 mt-2">
                    {applications.filter(app => app.status === 'accepted').length}
                  </p>
                </div>
                <div className="text-green-400 text-3xl">
                  <FiCheckCircle />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des candidatures */}
        {applications.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucune candidature pour le moment</h3>
            <p className="text-gray-400 mb-6">Vous n'avez pas encore reçu de candidatures pour vos offres d'emploi</p>
            <button
              onClick={() => window.location.href = '/company/jobs'}
              className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Voir les offres publiées
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slideUp">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFB000]/30 transition-all duration-500 group hover:scale-[1.02]"
              >
                {/* En-tête de la carte */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                          <FiBriefcase className="text-2xl text-[#FFB000]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                            {app.job.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <span className="flex items-center text-gray-300 text-sm">
                              <FiMapPin className="ml-1" />
                              {app.job.city}
                            </span>
                            <span className="flex items-center text-gray-300 text-sm">
                              <FiDollarSign className="ml-1" />
                              {app.job.salary ? `${app.job.salary} MAD` : "Non spécifié"}
                            </span>
                            <span className="flex items-center text-gray-300 text-sm">
                              <FiClock className="ml-1" />
                              {app.job.experienceRequired ? `${app.job.experienceRequired} ans` : "Non requis"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl border flex items-center ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span className="font-semibold">
                        {getStatusText(app.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informations du candidat */}
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FiUser className="ml-2 text-[#FFB000]" />
                      Informations du chauffeur
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiUser className="ml-2" />
                          <span className="font-medium">Nom :</span>
                        </div>
                        <p className="text-white text-lg font-semibold">{app.driver.name}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiPhone className="ml-2" />
                          <span className="font-medium">Téléphone :</span>
                        </div>
                        <p className="text-white">{app.driver.phone || "Non disponible"}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiMail className="ml-2" />
                          <span className="font-medium">Email :</span>
                        </div>
                        <p className="text-white">{app.driver.email}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiClock className="ml-2" />
                          <span className="font-medium">Années d'expérience :</span>
                        </div>
                        <p className="text-white">
                          {app.driver.experienceYears ? `${app.driver.experienceYears} ans` : "Non spécifié"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date de candidature */}
                  <div className="mb-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-gray-300 text-sm">Date de candidature</p>
                      <p className="text-white">{formatDate(app.createdAt)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => viewCV(app.driver._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiFileText className="group-hover/btn:scale-110 transition-transform" />
                      Voir le CV
                    </button>
                    <button
                      onClick={() => viewCertif(app.driver._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiAward className="group-hover/btn:scale-110 transition-transform" />
                      Certifications
                    </button>
                    <button
                      onClick={() => window.location.href = `/company/application/${app._id}/update-status`}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiRefreshCw className="group-hover/btn:rotate-180 transition-transform" />
                      Mettre à jour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Tous droits réservés | Système de gestion de recrutement</p>
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}