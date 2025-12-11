import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiHome,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlusCircle,
  FiBell,
  FiChevronDown,
  FiGrid,
  FiTrendingUp
} from "react-icons/fi";

export default function NavbarCompany() {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Exemple de compteur
  const navigate = useNavigate();

  // Chargement des données de l'entreprise
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("company") || "null");
        if (!stored?._id) return;

        const res = await api.get(`/companies/${stored._id}`);
        const data = res.data;

        // Construction de l'URL du logo
        let logoUrl = null;
        if (data.logo && data.logo.data) {
          logoUrl = `data:${data.logo.contentType};base64,${data.logo.data}`;
        }

        setCompany({ ...data, logoUrl });
      } catch (error) {
        console.log("Erreur API:", error);
      }
    };

    fetchCompanyData();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("company");
    localStorage.removeItem("companyToken");
    navigate("/company/login");
  };

  // Navigation items
  const navItems = [
    { to: "/company/dashboard", icon: <FiHome />, label: "Tableau de bord" },
    { to: "/company/job", icon: <FiBriefcase />, label: "Offres" },
    { to: "/company/applications", icon: <FiFileText />, label: "Candidatures" },
    { to: "/company/job/add", icon: <FiPlusCircle />, label: "Nouvelle offre" },
    { to: "/company/driver", icon: <FiUser />, label: "Liste des chauffeurs" },
  ];

  const dropdownItems = [
    { to: "/company/detail", icon: <FiUser />, label: "Profil public" },
    { to: "/company/profile", icon: <FiSettings />, label: "Paramètres" },
  ];

  return (
    <>
      {/* Navbar principale */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo et nom */}
            <Link 
              to="/company/dashboard" 
              className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl  flex items-center justify-center shadow-lg">
                  {company?.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`Logo ${company.name}`}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <FiBriefcase className="text-white text-lg" />
                  )}
                </div>
                <div className="absolute -inset-1 rounded-xl border-2 border-[#FFB000]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-white group-hover:text-[#FFB000] transition-colors">
                  {company?.name || "Entreprise"}
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Espace professionnel</p>
              </div>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-[#FFB000] hover:bg-white/5 rounded-xl transition-all duration-300 group"
                >
                  <div className="text-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Actions droite (desktop) */}
            <div className="hidden md:flex items-center gap-4">

              {/* Menu déroulant profil */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    {company?.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt="Avatar"
                        className="w-6 h-6 rounded-md object-cover"
                      />
                    ) : (
                      <FiUser className="text-white text-sm" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">{company?.name || "Entreprise"}</p>
                    <p className="text-xs text-gray-400">Gérer le compte</p>
                  </div>
                  <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-scaleUp">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-gray-400">Connecté en tant que</p>
                      <p className="text-white font-semibold truncate">{company?.email || "entreprise@email.com"}</p>
                    </div>
                    
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#FFB000] hover:bg-white/5 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <FiLogOut />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bouton menu mobile */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-[#FFB000] hover:bg-white/5 transition-all duration-300"
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {open && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10 animate-slideDown">
            <div className="px-4 py-4">
              
              {/* En-tête mobile */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB000] to-[#FF8C00] flex items-center justify-center">
                  {company?.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`Logo ${company.name}`}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <FiBriefcase className="text-white text-xl" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-white">{company?.name || "Entreprise"}</h2>
                  <p className="text-sm text-gray-400">{company?.email || "entreprise@email.com"}</p>
                </div>
              </div>

              {/* Liens navigation mobile */}
              <div className="space-y-1 mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#FFB000] hover:bg-white/5 rounded-xl transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Section profil mobile */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="px-4 text-sm text-gray-400 mb-2">Profil</h3>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#FFB000] hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Déconnexion mobile */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  <FiLogOut />
                  <span>Déconnexion</span>
                </button>
              </div>

              {/* Indicateur statut */}
              <div className="mt-4 px-4 py-3 bg-gradient-to-r from-[#FFB000]/10 to-[#FF8C00]/10 border border-[#FFB000]/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-[#FFB000]">Connecté • Entreprise active</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Overlay pour le menu mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}