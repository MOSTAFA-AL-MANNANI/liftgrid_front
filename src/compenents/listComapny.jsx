import React, { useEffect, useState } from "react";
import api from "../api";

// Import FontAwesome (si pas déjà installé)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faBuilding,
  faFilter,
  faUsers,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faEye,
  faCity,
  faBriefcase,
  faStar,
  faGlobe,
  faCheckCircle,
  faCalendarAlt,
  faTruck,
  faIndustry,
  faUserTie,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

export default function DriverCompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    byCity: {},
    bySector: {}
  });

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await api.get("/companies");
      const companiesData = res.data;
      setCompanies(companiesData);
      setFiltered(companiesData);
      
      // Calculer les stats
      const cityStats = {};
      const sectorStats = {};
      
      companiesData.forEach(company => {
        // Stats par ville
        if (company.city) {
          cityStats[company.city] = (cityStats[company.city] || 0) + 1;
        }
        
        // Stats par secteur (si disponible)
        if (company.sector) {
          sectorStats[company.sector] = (sectorStats[company.sector] || 0) + 1;
        }
      });
      
      setStats({
        total: companiesData.length,
        byCity: cityStats,
        bySector: sectorStats
      });
    } catch (err) {
      console.error("Erreur:", err.response?.data?.message);
      alert("Une erreur est survenue lors du chargement des entreprises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filtrage dynamique
  useEffect(() => {
    let list = [...companies];

    if (search.trim() !== "") {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cityFilter.trim() !== "") {
      list = list.filter((c) =>
        c.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (sectorFilter.trim() !== "") {
      list = list.filter((c) =>
        c.sector?.toLowerCase().includes(sectorFilter.toLowerCase())
      );
    }

    setFiltered(list);
    setCurrentPage(1);
  }, [search, cityFilter, sectorFilter, companies]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(start, start + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Open modal
  const openCompanyModal = (company) => {
    setSelectedCompany(company);
    setOpenModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'unset';
  };

  // Image de logo par défaut
  const getLogoUrl = (logo, companyName) => {
    return logo || `https://ui-avatars.com/api/?name=${companyName || "Company"}&background=FFB000&color=fff&bold=true&size=128`;
  };

  // Couleurs aléatoires pour les badges
  const getRandomColor = () => {
    const colors = [
      "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "bg-green-500/20 text-green-300 border-green-500/30",
      "bg-pink-500/20 text-pink-300 border-pink-500/30",
      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Top villes (pour suggestions)
  const topCities = Object.entries(stats.byCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city]) => city);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec effet de verre */}
        <div className="glass-effect rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000]/10 via-transparent to-[#FFB000]/10"></div>
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-2xl mb-4 animate-pulse">
              <FontAwesomeIcon icon={faBuilding} className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFB000] via-[#FF9500] to-[#FFB000] bg-clip-text text-transparent mb-3">
              Répertoire des Entreprises
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Découvrez les entreprises partenaires spécialisées dans le transport et la logistique
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="glass-effect rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faFilter} className="w-5 h-5 text-[#FFB000]" />
            <h2 className="text-xl font-semibold text-white">Filtres avancés</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une entreprise..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB000] focus:border-transparent transition-all duration-300 group-hover:border-[#FFB000]/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ville..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB000] focus:border-transparent transition-all duration-300 group-hover:border-[#FFB000]/50"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                list="cities"
              />
              <datalist id="cities">
                {topCities.map(city => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Secteur d'activité..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#FFB000] focus:border-transparent transition-all duration-300 group-hover:border-[#FFB000]/50"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Badges de villes populaires */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-400 mr-2">Villes populaires :</span>
            {topCities.map(city => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-3 py-1 text-sm rounded-full border ${getRandomColor()} hover:scale-105 transition-transform cursor-pointer`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:border-[#FFB000]/30 border border-transparent">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-xl">
                <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Entreprises totales</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:border-[#FFB000]/30 border border-transparent">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-xl">
                <FontAwesomeIcon icon={faFilter} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Résultats filtrés</p>
                <p className="text-2xl font-bold text-white">{filtered.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:border-[#FFB000]/30 border border-transparent">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-xl">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Page actuelle</p>
                <p className="text-2xl font-bold text-white">{currentPage}<span className="text-gray-400">/{totalPages}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des entreprises */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : currentItems.length === 0 ? (
          <div className="glass-effect rounded-2xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <FontAwesomeIcon icon={faSearch} className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Aucune entreprise trouvée
            </h3>
            <p className="text-gray-400 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCityFilter("");
                setSectorFilter("");
              }}
              className="px-6 py-2 bg-gradient-to-r from-[#FFB000] to-[#FF9500] text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentItems.map((company, index) => (
                <div
                  key={company._id}
                  className="group relative glass-effect rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openCompanyModal(company)}
                >
                  {/* Effet de bordure animée */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] via-[#FF9500] to-[#FFB000] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-[1px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"></div>
                  
                  {/* Contenu de la carte */}
                  <div className="relative p-6">
                    {/* Header de la carte */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={getLogoUrl(company.logo, company.name)}
                            alt={company.name}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-gray-700 group-hover:border-[#FFB000] transition-colors"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#FFB000] transition-colors">
                            {company.name}
                          </h3>
                          {company.sector && (
                            <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full">
                              {company.sector}
                            </span>
                          )}
                        </div>
                      </div>
                      <FontAwesomeIcon 
                        icon={faEye} 
                        className="w-5 h-5 text-gray-500 group-hover:text-[#FFB000] transition-colors" 
                      />
                    </div>
                    
                    {/* Détails */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 text-[#FFB000]" />
                        </div>
                        <span className="text-sm">{company.city || "Non spécifiée"}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <FontAwesomeIcon icon={faPhone} className="w-3 h-3 text-[#FFB000]" />
                        </div>
                        <span className="text-sm">{company.phone || "Non spécifié"}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 text-[#FFB000]" />
                        </div>
                        <span className="text-sm truncate">{company.email || "Non spécifié"}</span>
                      </div>
                    </div>
                    
                    {/* Footer de la carte */}
                    <div className="pt-4 border-t border-gray-800">
                      <button className="w-full py-3 bg-gradient-to-r from-[#FFB000]/20 to-[#FF9500]/20 text-[#FFB000] font-semibold rounded-xl hover:from-[#FFB000]/30 hover:to-[#FF9500]/30 transition-all duration-300 group-hover:shadow-lg backdrop-blur-sm">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="glass-effect rounded-2xl p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-gray-400">
                    Affichage <span className="text-white font-semibold">{start + 1}-{Math.min(start + itemsPerPage, filtered.length)}</span> sur <span className="text-white font-semibold">{filtered.length}</span> entreprises
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-[#FFB000] hover:to-[#FF9500] text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={currentPage === 1}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                      Précédent
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, index) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = index + 1;
                        } else if (currentPage <= 3) {
                          pageNum = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + index;
                        } else {
                          pageNum = currentPage - 2 + index;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                              currentPage === pageNum
                                ? "bg-gradient-to-br from-[#FFB000] to-[#FF9500] text-white shadow-lg"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-[#FFB000] hover:to-[#FF9500] text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                      <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {openModal && selectedCompany && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="glass-effect-modal rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="sticky top-0 glass-effect rounded-t-3xl px-6 py-4 flex items-center justify-between border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Détails de l'entreprise</h2>
              <button
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Contenu modal */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <img
                    src={getLogoUrl(selectedCompany.logo, selectedCompany.name)}
                    alt={selectedCompany.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-800"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#FFB000] to-[#FF9500] rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedCompany.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#FFB000]/20 to-[#FF9500]/20 text-[#FFB000] rounded-full text-sm">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      {selectedCompany.city || "Non spécifiée"}
                    </span>
                    {selectedCompany.sector && (
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                        {selectedCompany.sector}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Informations détaillées */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFB000] to-[#FF9500] flex items-center justify-center">
                        <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Contact téléphonique</h4>
                        <p className="text-gray-300">{selectedCompany.phone || "Non spécifié"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFB000] to-[#FF9500] flex items-center justify-center">
                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Adresse email</h4>
                        <p className="text-gray-300">{selectedCompany.email || "Non spécifié"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedCompany.description && (
                  <div className="p-4 bg-gray-800/30 rounded-xl">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FontAwesomeIcon icon={faBriefcase} />
                      Description
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCompany.description}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Informations supplémentaires */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedCompany.founded && (
                  <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                    <FontAwesomeIcon icon={faCalendarAlt} className="w-6 h-6 text-[#FFB000] mb-2" />
                    <p className="text-sm text-gray-400">Fondée en</p>
                    <p className="text-white font-semibold">{selectedCompany.founded}</p>
                  </div>
                )}
                
                {selectedCompany.employees && (
                  <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                    <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-[#FFB000] mb-2" />
                    <p className="text-sm text-gray-400">Employés</p>
                    <p className="text-white font-semibold">{selectedCompany.employees}+</p>
                  </div>
                )}
                
                {selectedCompany.vehicles && (
                  <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                    <FontAwesomeIcon icon={faTruck} className="w-6 h-6 text-[#FFB000] mb-2" />
                    <p className="text-sm text-gray-400">Véhicules</p>
                    <p className="text-white font-semibold">{selectedCompany.vehicles}</p>
                  </div>
                )}
                
                <div className="text-center p-3 bg-gray-800/30 rounded-xl">
                  <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-[#FFB000] mb-2" />
                  <p className="text-sm text-gray-400">Statut</p>
                  <p className="text-white font-semibold">Partenaire vérifié</p>
                </div>
              </div>
              
              {/* Boutons d'action */}
              <div className="flex justify-center gap-4 pt-6 border-t border-gray-800">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-[#FFB000] to-[#FF9500] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FFB000]/20 transition-all duration-300"
                  onClick={closeModal}
                >
                  Fermer
                </button>
                {selectedCompany.website && (
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                    Site web
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        
        .animate-scale-up {
          animation: scaleUp 0.3s ease-out;
        }
        
        .glass-effect {
          background: rgba(30, 41, 59, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 176, 0, 0.1);
        }
        
        .glass-effect-modal {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 176, 0, 0.2);
        }
      `}</style>
    </div>
  );
}