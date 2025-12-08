import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiUsers,
  FiTrash2,
  FiEdit,
  FiPlus,
  FiFilter,
  FiSearch,
  FiTrendingUp,
  FiActivity
} from "react-icons/fi";

export default function CompanyJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const navigate = useNavigate();
  
  const company = JSON.parse(localStorage.getItem("company"));

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/companies/${company._id}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deactivateJob = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
      setShowDeleteModal(null);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    }
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const getStatusIcon = (isActive) => {
    return isActive 
      ? <FiCheckCircle className="mr-2" /> 
      : <FiXCircle className="mr-2" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  // Filtrer et rechercher les offres
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === "all" || 
      (filter === "active" && job.isActive) || 
      (filter === "inactive" && !job.isActive);
    
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.city.toLowerCase().includes(search.toLowerCase()) ||
      job.description?.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(job => job.isActive).length,
    inactive: jobs.filter(job => !job.isActive).length
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des offres d'emploi...</p>
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
                Mes <span className="text-[#FFB000]">offres d'emploi</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Gérez et suivez toutes vos offres publiées
              </p>
            </div>
            <button
              onClick={() => navigate('/company/job/add')}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <FiPlus />
              Nouvelle offre
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total des offres</p>
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
                  <p className="text-gray-400 text-sm">Offres actives</p>
                  <p className="text-3xl font-bold text-green-400 mt-2">{stats.active}</p>
                </div>
                <div className="text-green-400 text-3xl">
                  <FiActivity />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Offres désactivées</p>
                  <p className="text-3xl font-bold text-red-400 mt-2">{stats.inactive}</p>
                </div>
                <div className="text-red-400 text-3xl">
                  <FiXCircle />
                </div>
              </div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une offre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    filter === "all"
                      ? "bg-[#FFB000] text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filter === "active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <FiCheckCircle />
                  Actives
                </button>
                <button
                  onClick={() => setFilter("inactive")}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filter === "inactive"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <FiXCircle />
                  Inactives
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des offres */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">📋</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {jobs.length === 0 ? "Aucune offre publiée" : "Aucune offre ne correspond à votre recherche"}
            </h3>
            <p className="text-gray-400 mb-6">
              {jobs.length === 0 
                ? "Commencez par créer votre première offre d'emploi"
                : "Essayez de modifier vos critères de recherche"
              }
            </p>
            <button
              onClick={() => navigate('/company/job/add')}
              className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Créer une offre
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-slideUp">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFB000]/30 transition-all duration-500 group hover:scale-[1.02]"
              >
                {/* En-tête de la carte */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#FFB000]/20 p-2 rounded-lg">
                          <FiBriefcase className="text-xl text-[#FFB000]" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center ${getStatusColor(job.isActive)}`}>
                          {getStatusIcon(job.isActive)}
                          {job.isActive ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informations principales */}
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FiMapPin className="mr-3 text-[#FFB000]" />
                      <span>{job.city}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiDollarSign className="mr-3 text-[#FFB000]" />
                      <span>{formatSalary(job.salary)}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiClock className="mr-3 text-[#FFB000]" />
                      <span>
                        {job.experienceRequired ? `${job.experienceRequired} ans` : "Non requis"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiCalendar className="mr-3 text-[#FFB000]" />
                      <span>Publiée le {formatDate(job.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Description (abrégée) */}
                <div className="p-6 border-b border-white/10">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {job.description || "Aucune description disponible"}
                  </p>
                </div>

                {/* Actions */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate(`/company/job/${job._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiEye className="group-hover/btn:scale-110 transition-transform" />
                      Détails
                    </button>
                    <button
                      onClick={() => navigate(`/company/job/${job._id}/applications`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiUsers className="group-hover/btn:scale-110 transition-transform" />
                      Candidatures
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(job._id)}
                      className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-3 rounded-xl border border-red-600/30 transition-all duration-300 hover:scale-105 group/btn"
                    >
                      <FiTrash2 className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Résumé */}
        {filteredJobs.length > 0 && (
          <div className="mt-10 animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Résumé des offres
                  </h3>
                  <p className="text-gray-300">
                    {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} affichée{filteredJobs.length > 1 ? 's' : ''} sur {jobs.length} au total
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {Math.round((stats.active / stats.total) * 100) || 0}%
                    </div>
                    <div className="text-gray-400 text-sm">Taux d'activation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#FFB000]">
                      {stats.total}
                    </div>
                    <div className="text-gray-400 text-sm">Total des offres</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full p-6 animate-scaleUp">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <FiTrash2 className="text-3xl text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Désactiver l'offre
              </h3>
              <p className="text-gray-300">
                Êtes-vous sûr de vouloir désactiver cette offre d'emploi ?<br />
                Cette action est irréversible et les candidats ne pourront plus postuler.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Annuler
              </button>
              <button
                onClick={() => deactivateJob(showDeleteModal)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

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
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
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