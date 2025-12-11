import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  FiUser,
  FiMapPin,
  FiClock,
  FiPhone,
  FiMail,
  FiFileText,
  FiAward,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiDownload,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiActivity,
  FiRefreshCw
} from "react-icons/fi";

export default function CompanyDriversList() {
  const [drivers, setDrivers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/drivers");
      setDrivers(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Filtrage dynamique
  useEffect(() => {
    let list = [...drivers];

    if (search.trim() !== "") {
      list = list.filter((d) =>
        d.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cityFilter.trim() !== "") {
      list = list.filter((d) =>
        d.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (expFilter.trim() !== "") {
      list = list.filter((d) => Number(d.experienceYears) >= Number(expFilter));
    }

    setFiltered(list);
    setCurrentPage(1);
  }, [search, cityFilter, expFilter, drivers]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(start, start + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getExperienceLevel = (years) => {
    if (!years) return "Débutant";
    if (years < 2) return "Junior";
    if (years < 5) return "Intermédiaire";
    return "Senior";
  };

  const getExperienceColor = (years) => {
    if (!years) return "bg-gray-500/20 text-gray-400";
    if (years < 2) return "bg-blue-500/20 text-blue-400";
    if (years < 5) return "bg-green-500/20 text-green-400";
    return "bg-[#FFB000]/20 text-[#FFB000]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des chauffeurs...</p>
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
                Liste des <span className="text-[#FFB000]">chauffeurs</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Découvrez et contactez les chauffeurs professionnels disponibles
              </p>
            </div>
            <button
              onClick={fetchDrivers}
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
                  <p className="text-gray-400 text-sm">Total des chauffeurs</p>
                  <p className="text-3xl font-bold text-white mt-2">{filtered.length}</p>
                </div>
                <div className="text-[#FFB000] text-3xl">
                  <FiUsers />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Expérience moyenne</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {filtered.length > 0
                      ? Math.round(filtered.reduce((sum, d) => sum + (d.experienceYears || 0), 0) / filtered.length)
                      : 0} ans
                  </p>
                </div>
                <div className="text-[#FFB000] text-3xl">
                  <FiTrendingUp />
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Villes différentes</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {[...new Set(filtered.map(d => d.city))].length}
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
                  <p className="text-gray-400 text-sm">Niveau Senior</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {filtered.filter(d => (d.experienceYears || 0) >= 5).length}
                  </p>
                </div>
                <div className="text-[#FFB000] text-3xl">
                  <FiStar />
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ville"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
                </div>
                <div className="relative flex-1">
                  <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    placeholder="Expérience min (années)"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all"
                    value={expFilter}
                    onChange={(e) => setExpFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {filtered.length < drivers.length && (
              <div className="mt-4 text-sm text-[#FFB000]">
                {filtered.length} résultat{filtered.length > 1 ? 's' : ''} sur {drivers.length} chauffeurs
              </div>
            )}
          </div>
        </div>

        {/* Liste des chauffeurs */}
        {currentItems.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center animate-fadeIn">
            <div className="text-6xl text-gray-500 mb-4">👤</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {filtered.length === 0 ? "Aucun chauffeur disponible" : "Aucun résultat pour votre recherche"}
            </h3>
            <p className="text-gray-400 mb-6">
              {filtered.length === 0 
                ? "Aucun chauffeur n'est actuellement enregistré sur la plateforme"
                : "Essayez de modifier vos critères de recherche"
              }
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCityFilter("");
                setExpFilter("");
              }}
              className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
              {currentItems.map((driver) => (
                <div
                  key={driver._id}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-[#FFB000]/30 transition-all duration-500 group hover:scale-[1.02]"
                >
                  {/* En-tête de la carte */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-[#FFB000]/20 p-2 rounded-lg">
                            <FiUser className="text-xl text-[#FFB000]" />
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FFB000] transition-colors">
                            {driver.fullName}
                          </h3>
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getExperienceColor(driver.experienceYears)}`}>
                          {getExperienceLevel(driver.experienceYears)}
                        </div>
                      </div>
                    </div>

                    {/* Informations rapides */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {driver.experienceYears || 0} ans
                        </div>
                        <div className="text-gray-400 text-xs">Expérience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">
                          {driver.city || "Non spécifié"}
                        </div>
                        <div className="text-gray-400 text-xs">Ville</div>
                      </div>
                    </div>
                  </div>

                  {/* Informations détaillées */}
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-300">
                        <FiPhone className="mr-3 text-[#FFB000]" />
                        <span className="truncate">{driver.phone || "Non spécifié"}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FiMail className="mr-3 text-[#FFB000]" />
                        <span className="truncate">{driver.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FiClock className="mr-3 text-[#FFB000]" />
                        <span>Inscrit le {new Date(driver.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <FiFileText className="mr-2 text-[#FFB000]" />
                        Documents professionnels
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`${api.defaults.baseURL}/drivers/${driver._id}/cv`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                        >
                          <FiFileText className="group-hover/btn:scale-110 transition-transform" />
                          CV
                        </a>
                        <a
                          href={`${api.defaults.baseURL}/drivers/${driver._id}/certifications`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                        >
                          <FiAward className="group-hover/btn:scale-110 transition-transform" />
                          Certifications
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Pied de carte */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-400">
                        <FiActivity className="mr-1" />
                        <span>Profil vérifié</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`text-sm ${i < Math.min(driver.experienceYears || 0, 5) ? 'text-[#FFB000]' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 animate-fadeIn">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-gray-300 text-sm">
                      Affichage de {start + 1} à {Math.min(start + itemsPerPage, filtered.length)} sur {filtered.length} chauffeurs
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <FiChevronLeft />
                        Précédent
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const page = index + 1;
                          // Afficher seulement les pages proches de la page actuelle
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={index}
                                onClick={() => goToPage(page)}
                                className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                                  currentPage === page
                                    ? "bg-[#FFB000] text-white"
                                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return <span key={index} className="text-gray-400">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Suivant
                        <FiChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Conseils */}
        <div className="mt-10 animate-fadeIn">
          <div className="bg-gradient-to-r from-[#FFB000]/10 to-[#FF8C00]/10 rounded-2xl border border-[#FFB000]/20 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFB000] p-3 rounded-xl">
                <FiUsers className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Comment recruter un chauffeur ?</h3>
                <p className="text-gray-300">
                  Consultez les CV et certifications des chauffeurs, puis contactez directement 
                  ceux qui correspondent à vos besoins. Vous pouvez également poster une offre d'emploi 
                  pour attirer les candidats intéressés.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Répertoire des chauffeurs • {filtered.length} professionnel{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
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