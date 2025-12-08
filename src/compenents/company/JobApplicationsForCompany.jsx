import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiBriefcase,
  FiUser,
  FiMail,
  FiPhone,
  FiClock,
  FiFileText,
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiArrowLeft,
  FiUsers,
  FiCalendar,
  FiEye,
  FiTrendingUp
} from "react-icons/fi";

export default function JobApplicationsForCompany() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobInfo, setJobInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchJobApplications = async () => {
    setLoading(true);
    try {
      const [applicationsRes, jobRes] = await Promise.all([
        api.get(`/jobs/${id}/applications`),
        api.get(`/jobs/${id}`)
      ]);
      
      setApplications(applicationsRes.data);
      setJobInfo(jobRes.data);
    } catch (err) {
      console.error("Erreur:", err.response?.data?.message);
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
    fetchJobApplications();
  }, [id]);

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
        {/* En-tête avec bouton retour */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#FFB000] hover:text-[#FF8C00] mb-6 transition-all duration-300 hover:gap-3"
          >
            <FiArrowLeft />
            <span className="font-semibold">Retour</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Candidatures pour <span className="text-[#FFB000]">cette offre</span>
              </h1>
              {jobInfo && (
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <div className="bg-[#FFB000]/20 text-[#FFB000] px-3 py-1 rounded-full text-sm font-semibold">
                    {jobInfo.title}
                  </div>
                  <div className="text-gray-300">
                    {applications.length} candidature{applications.length > 1 ? 's' : ''} reçue{applications.length > 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={fetchJobApplications}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105"
            >
              <FiLoader className={loading ? "animate-spin" : ""} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        {applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slideUp">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-3xl font-bold text-white mt-2">{applications.length}</p>
                </div>
                <div className="text-[#FFB000] text-3xl">
                  <FiUsers />
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
        )}

        {/* Liste des candidatures */}
        {applications.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucune candidature pour le moment</h3>
            <p className="text-gray-400 mb-6">
              Personne n'a encore postulé à cette offre d'emploi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Retour aux offres
              </button>
              <button
                onClick={fetchJobApplications}
                className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Actualiser
              </button>
            </div>
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
                          <FiUser className="text-2xl text-[#FFB000]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                            {app.driver.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 flex-wrap">
                            <span className="flex items-center text-gray-300 text-sm">
                              <FiMail className="ml-1" />
                              {app.driver.email}
                            </span>
                            <span className="flex items-center text-gray-300 text-sm">
                              <FiPhone className="ml-1" />
                              {app.driver.phone || "Non disponible"}
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
                      <FiBriefcase className="ml-2 text-[#FFB000]" />
                      Informations professionnelles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiClock className="ml-2" />
                          <span className="font-medium">Expérience :</span>
                        </div>
                        <p className="text-white text-lg font-semibold">
                          {app.driver.experienceYears ? `${app.driver.experienceYears} ans` : "Non spécifié"}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center text-gray-300 mb-2">
                          <FiCalendar className="ml-2" />
                          <span className="font-medium">Date de candidature :</span>
                        </div>
                        <p className="text-white">{formatDate(app.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents et actions */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <FiFileText className="ml-2 text-[#FFB000]" />
                      Documents
                    </h4>
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
                        onClick={() => navigate(`/company/application/${app._id}/update-status`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                      >
                        <FiEye className="group-hover/btn:scale-110 transition-transform" />
                        Examiner
                      </button>
                    </div>
                  </div>

                  {/* Métriques supplémentaires */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-300">
                        <FiTrendingUp className="mr-2" />
                        <span>Score de compatibilité</span>
                      </div>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#FFB000] h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: app.driver.experienceYears 
                              ? `${Math.min(app.driver.experienceYears * 15, 100)}%` 
                              : '0%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-[#FFB000] font-bold">
                        {app.driver.experienceYears 
                          ? `${Math.min(app.driver.experienceYears * 15, 100)}%` 
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pied de page avec statistiques */}
        {applications.length > 0 && (
          <div className="mt-12 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Résumé des candidatures</h3>
                  <p className="text-gray-300">
                    {applications.length} candidature{applications.length > 1 ? 's' : ''} au total pour cette offre
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {applications.filter(app => app.status === 'accepted').length}
                      </div>
                      <div className="text-gray-400 text-sm">Acceptées</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        {applications.filter(app => app.status === 'pending').length}
                      </div>
                      <div className="text-gray-400 text-sm">En attente</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">
                        {applications.filter(app => app.status === 'rejected').length}
                      </div>
                      <div className="text-gray-400 text-sm">Rejetées</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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