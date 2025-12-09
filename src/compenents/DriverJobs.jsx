import React, { useEffect, useState } from "react";
import api from "../api";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiNavigation,
  FiStar,
  FiCalendar,
  FiEye,
  FiTrendingUp,
  FiLoader
} from "react-icons/fi";

export default function DriverJobsList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, recent, highSalary, nearby
  const [applying, setApplying] = useState({});
  const driver = JSON.parse(localStorage.getItem("driver"));

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      const activeJobs = res.data.filter((job) => job.isActive);
      setJobs(activeJobs);
      setFilteredJobs(activeJobs);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    setApplying({ ...applying, [jobId]: true });
    try {
      await api.post("/applications", {
        driverId: driver._id,
        jobId
      });
      
      // Animation de succès
      const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
      if (jobCard) {
        jobCard.classList.add('animate-pulse', 'ring-4', 'ring-[#FFB000]/50');
        
        setTimeout(() => {
          if (jobCard) {
            jobCard.classList.remove('animate-pulse', 'ring-4', 'ring-[#FFB000]/50');
          }
        }, 1500);
      }
      
      // Retirer l'offre après candidature
      setJobs(jobs.filter(job => job._id !== jobId));
      setFilteredJobs(filteredJobs.filter(job => job._id !== jobId));
      
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    } finally {
      setApplying({ ...applying, [jobId]: false });
    }
  };

  // Filtrer et rechercher les offres
  useEffect(() => {
    let result = jobs;
    
    // Recherche par titre, ville, description ou nom d'entreprise
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.city.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower) ||
        job.company?.name?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtres supplémentaires
    switch(filter) {
      case 'recent':
        result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'highSalary':
        result = result.sort((a, b) => (b.salary || 0) - (a.salary || 0));
        break;
      case 'nearby':
        // Ici, on pourrait filtrer par distance si on avait la localisation du chauffeur
        result = result.filter(job => job.city === driver?.city);
        break;
      default:
        break;
    }
    
    setFilteredJobs(result);
  }, [search, filter, jobs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "À négocier";
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(salary);
  };

  const getExperienceLevel = (years) => {
    if (!years) return "Débutant";
    if (years < 2) return "Junior";
    if (years < 5) return "Intermédiaire";
    return "Senior";
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Recherche des offres disponibles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Offres d'emploi <span className="text-[#FFB000]">disponibles</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Trouvez l'opportunité parfaite pour votre carrière de chauffeur
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slideUp">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Offres totales</p>
                <p className="text-3xl font-bold text-white mt-2">{filteredJobs.length}</p>
              </div>
              <div className="text-[#FFB000] text-3xl">
                <FiBriefcase />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Dans votre ville</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {jobs.filter(job => job.city === driver?.city).length}
                </p>
              </div>
              <div className="text-[#FFB000] text-3xl">
                <FiMapPin />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Salaire moyen</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {jobs.length > 0 
                    ? formatSalary(Math.round(jobs.reduce((sum, job) => sum + (job.salary || 0), 0) / jobs.length))
                    : "N/A"
                  }
                </p>
              </div>
              <div className="text-[#FFB000] text-3xl">
                <FiDollarSign />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Nouveautés</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {jobs.filter(job => {
                    const daysAgo = (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24);
                    return daysAgo < 7;
                  }).length}
                </p>
              </div>
              <div className="text-[#FFB000] text-3xl">
                <FiTrendingUp />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8 animate-slideUp">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une offre par titre, ville ou entreprise..."
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
                onClick={() => setFilter("recent")}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === "recent"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FiCalendar />
                Récentes
              </button>
              <button
                onClick={() => setFilter("highSalary")}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  filter === "highSalary"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                }`}
              >
                <FiDollarSign />
                Meilleurs salaires
              </button>
            </div>
          </div>
        </div>

        {/* Liste des offres */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">📋</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {jobs.length === 0 ? "Aucune offre disponible" : "Aucune offre ne correspond à votre recherche"}
            </h3>
            <p className="text-gray-400 mb-6">
              {jobs.length === 0 
                ? "Revenez plus tard pour découvrir de nouvelles opportunités"
                : "Essayez de modifier vos critères de recherche"
              }
            </p>
            <button
              onClick={fetchJobs}
              className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Actualiser la liste
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                data-job-id={job._id}
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
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-gray-300 text-sm">
                         
                          <span className="truncate">{job.company?.name || "Entreprise"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FFB000]/10 text-[#FFB000] px-3 py-1 rounded-full text-xs font-semibold">
                      {getExperienceLevel(job.experienceRequired)}
                    </div>
                  </div>

                  {/* Métriques rapides */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{formatSalary(job.salary)}</div>
                      <div className="text-gray-400 text-xs">Salaire</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {job.experienceRequired || 0} ans
                      </div>
                      <div className="text-gray-400 text-xs">Expérience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {formatDate(job.createdAt)}
                      </div>
                      <div className="text-gray-400 text-xs">Publication</div>
                    </div>
                  </div>
                </div>

                {/* Informations détaillées */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <FiMapPin className="mr-3 text-[#FFB000]" />
                      <span>{job.city}</span>
                    </div>
                    {job.description && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Description</p>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {job.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bouton de candidature */}
                  <button
                    onClick={() => applyToJob(job._id)}
                    disabled={applying[job._id]}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFB000] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFB000] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {applying[job._id] ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Candidature en cours...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="group-hover/btn:scale-110 transition-transform" />
                        Postuler maintenant
                      </>
                    )}
                  </button>
                </div>

                {/* Pied de carte */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <FiStar className="mr-1" />
                      <span>Opportunité à saisir</span>
                    </div>
                    <button
                      onClick={() => window.location.href = `/driver/job/${job._id}`}
                      className="text-[#FFB000] hover:text-[#FF8C00] font-semibold flex items-center gap-1"
                    >
                      <FiEye />
                      <span>Détails</span>
                    </button>
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
                <FiNavigation className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Conseils pour votre candidature</h3>
                <p className="text-gray-300">
                  Assurez-vous que votre CV et vos certifications sont à jour pour maximiser vos chances.
                  Postulez rapidement aux nouvelles offres pour être parmi les premiers candidats.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Offres d'emploi • {filteredJobs.length} opportunité{filteredJobs.length > 1 ? 's' : ''} disponible{filteredJobs.length > 1 ? 's' : ''}</p>
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