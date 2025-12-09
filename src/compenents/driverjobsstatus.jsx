import React, { useEffect, useState } from "react";
import api from "../api";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiFileText,
  FiAward,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiFilter,
  FiTrendingUp,
  FiActivity,
  FiRefreshCw
} from "react-icons/fi";

export default function DriverApplicationsStatus() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected
  const driver = JSON.parse(localStorage.getItem("driver"));

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/drivers/${driver._id}/applications`);
      setApplications(res.data);
      setFilteredApplications(res.data);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiLoader className="mr-2" />;
      case "accepted":
        return <FiCheckCircle className="mr-2" />;
      case "rejected":
        return <FiXCircle className="mr-2" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "accepted":
        return "Acceptée";
      case "rejected":
        return "Rejetée";
      default:
        return status;
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

  const formatSalary = (salary) => {
    if (!salary) return "Non spécifié";
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(salary);
  };

  // Filtrer les candidatures
  useEffect(() => {
    if (filter === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === filter));
    }
  }, [filter, applications]);

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    accepted: applications.filter(app => app.status === "accepted").length,
    rejected: applications.filter(app => app.status === "rejected").length
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement de vos candidatures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Mes <span className="text-[#FFB000]">candidatures</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Suivez l'état de vos candidatures auprès des entreprises
              </p>
            </div>
            <button
              onClick={fetchApplications}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105"
            >
              <FiRefreshCw className={loading ? "animate-spin" : ""} />
              Actualiser
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total des candidatures</p>
                  <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
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
                  <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.pending}</p>
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
                  <p className="text-3xl font-bold text-green-400 mt-2">{stats.accepted}</p>
                </div>
                <div className="text-green-400 text-3xl">
                  <FiCheckCircle />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Rejetées</p>
                  <p className="text-3xl font-bold text-red-400 mt-2">{stats.rejected}</p>
                </div>
                <div className="text-red-400 text-3xl">
                  <FiXCircle />
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiFilter className="mr-3 text-[#FFB000]" />
              Filtrer par statut
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  filter === "all"
                    ? "bg-[#FFB000] text-white"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                Toutes ({stats.total})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === "pending"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FiLoader />
                En attente ({stats.pending})
              </button>
              <button
                onClick={() => setFilter("accepted")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === "accepted"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FiCheckCircle />
                Acceptées ({stats.accepted})
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === "rejected"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FiXCircle />
                Rejetées ({stats.rejected})
              </button>
            </div>
          </div>
        </div>

        {/* Liste des candidatures */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {applications.length === 0 ? "Aucune candidature" : "Aucune candidature avec ce statut"}
            </h3>
            <p className="text-gray-400 mb-6">
              {applications.length === 0 
                ? "Vous n'avez pas encore postulé à des offres d'emploi"
                : "Modifiez votre filtre pour voir d'autres candidatures"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/driver/jobs'}
                className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Parcourir les offres
              </button>
              <button
                onClick={fetchApplications}
                className="bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-6 py-3 rounded-xl border border-[#FFB000]/30 font-semibold transition-all duration-300 hover:scale-105"
              >
                Actualiser
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
            {filteredApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFB000]/30 transition-all duration-500 group hover:scale-[1.02]"
              >
                {/* En-tête de la carte */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#FFB000]/20 p-2 rounded-lg">
                          <FiBriefcase className="text-xl text-[#FFB000]" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                          {app.job?.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-gray-300 text-sm">
                          
                          <span className="truncate">{app.job?.company?.name || "Entreprise"}</span>
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

                  {/* Informations rapides */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {formatSalary(app.job?.salary)}
                      </div>
                      <div className="text-gray-400 text-xs">Salaire</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {app.job?.experienceRequired || 0} ans
                      </div>
                      <div className="text-gray-400 text-xs">Expérience</div>
                    </div>
                  </div>
                </div>

                {/* Détails */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <FiMapPin className="mr-3 text-[#FFB000]" />
                      <span>{app.job?.city}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiCalendar className="mr-3 text-[#FFB000]" />
                      <span>Candidaté le {formatDate(app.appliedAt || app.createdAt)}</span>
                    </div>
                    {app.job?.description && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Description du poste</p>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {app.job.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Documents */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FiFileText className="mr-2 text-[#FFB000]" />
                      Documents envoyés
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {app.driver?.cv && (
                        <button
                          onClick={() => window.open(`${api.defaults.baseURL}/drivers/${app.driver._id}/cv`, "_blank")}
                          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                        >
                          <FiFileText className="group-hover/btn:scale-110 transition-transform" />
                          Voir CV
                        </button>
                      )}
                      {app.driver?.certifications && (
                        <button
                          onClick={() => window.open(`${api.defaults.baseURL}/drivers/${app.driver._id}/certifications`, "_blank")}
                          className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-xl border border-green-600/30 transition-all duration-300 hover:scale-105 group/btn"
                        >
                          <FiAward className="group-hover/btn:scale-110 transition-transform" />
                          Certifications
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => window.location.href = `/driver/job/${app.job?._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiEye className="group-hover/btn:scale-110 transition-transform" />
                      Voir l'offre
                    </button>
                  </div>
                </div>

                {/* Pied de carte */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <FiActivity className="mr-1" />
                      <span>Dernière mise à jour: {formatDate(app.updatedAt || app.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conseils */}
        <div className="mt-10 animate-fadeIn">
          <div className="bg-gradient-to-r from-[#FFB000]/10 to-[#FF8C00]/10 rounded-2xl border border-[#FFB000]/20 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFB000] p-3 rounded-xl">
                <FiTrendingUp className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Conseils pour vos candidatures</h3>
                <ul className="text-gray-300 space-y-1">
                  <li>• Les candidatures en attente peuvent prendre plusieurs jours pour être traitées</li>
                  <li>• Assurez-vous que vos documents sont toujours à jour</li>
                  <li>• N'hésitez pas à postuler à plusieurs offres pour augmenter vos chances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Résumé */}
        {filteredApplications.length > 0 && (
          <div className="mt-10 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Résumé de vos candidatures
                  </h3>
                  <p className="text-gray-300">
                    {filteredApplications.length} candidature{filteredApplications.length > 1 ? 's' : ''} affichée{filteredApplications.length > 1 ? 's' : ''} 
                    {filter !== "all" && ` avec le statut "${getStatusText(filter)}"`}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
                      <div className="text-gray-400 text-sm">En attente</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{stats.accepted}</div>
                      <div className="text-gray-400 text-sm">Acceptées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
                      <div className="text-gray-400 text-sm">Rejetées</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Suivi des candidatures • Taux de réponse: {
            stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0
          }%</p>
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}