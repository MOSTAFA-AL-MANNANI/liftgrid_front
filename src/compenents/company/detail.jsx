import React, { useEffect, useState } from "react";
import api from "../../api";
import {  FiMail, FiPhone, FiMapPin, FiFileText, FiCheckCircle, FiClock, FiEdit, FiGlobe, FiUsers, FiCalendar } from "react-icons/fi";

export default function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const stored = localStorage.getItem("company");
      if (!stored) return;

      const comp = JSON.parse(stored);
      
      try {
        const res = await api.get(`/companies/${comp._id}`);
        setCompany(res.data);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold text-white mb-2">Entreprise non trouvée</h2>
          <p className="text-gray-300">Les informations de l'entreprise ne sont pas disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Profil de <span className="text-[#FFB000]">l'entreprise</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Consultez et gérez les informations de votre entreprise
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden animate-slideUp">
          {/* En-tête avec logo */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-[#FFB000]/20 to-[#FF8C00]/20"></div>
            <div className="absolute -bottom-16 left-6 md:left-8">
              <div className="relative group">
                {company.logo && company.logo.data ? (
                  <img
                    src={`data:${company.logo.contentType};base64,${company.logo.data}`}
                    alt={`Logo ${company.name}`}
                    className="w-32 h-32 rounded-2xl border-4 border-gray-900 object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-4 border-gray-900 bg-gradient-to-br from-[#FFB000]/30 to-[#FF8C00]/30 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <FiBuilding className="text-5xl text-white/70" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-2xl border-2 border-[#FFB000]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="pt-20 p-6 md:p-8">
            {/* Nom et statut */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {company.name}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center text-gray-300">
                    <span className="font-medium">Entreprise</span>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full ${
                    company.isActive 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    <FiCheckCircle className="mr-2" />
                    <span>{company.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => window.location.href = '/company/profile'}
                className="mt-4 md:mt-0 flex items-center gap-2 bg-[#FFB000] hover:bg-[#FF8C00] text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <FiEdit />
                Modifier
              </button>
            </div>

            {/* Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                    <FiFileText className="text-2xl text-[#FFB000]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white ml-3">Numéro RC</h3>
                </div>
                <p className="text-2xl font-bold text-white">{company.rcNumber}</p>
                <p className="text-gray-400 text-sm mt-1">Numéro d'enregistrement commercial</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                    <FiMail className="text-2xl text-[#FFB000]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white ml-3">Email</h3>
                </div>
                <p className="text-xl text-white truncate">{company.email}</p>
                <p className="text-gray-400 text-sm mt-1">Adresse email principale</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                    <FiPhone className="text-2xl text-[#FFB000]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white ml-3">Téléphone</h3>
                </div>
                <p className="text-2xl font-bold text-white">{company.phone}</p>
                <p className="text-gray-400 text-sm mt-1">Contact principal</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-4">
                  <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                    <FiMapPin className="text-2xl text-[#FFB000]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white ml-3">Ville</h3>
                </div>
                <p className="text-2xl font-bold text-white">{company.city}</p>
                <p className="text-gray-400 text-sm mt-1">Localisation</p>
              </div>
            </div>

            {/* Description */}
            {company.description && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FiGlobe className="mr-3 text-[#FFB000]" />
                  Description
                </h3>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed">{company.description}</p>
                </div>
              </div>
            )}

            {/* Informations supplémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-4">
                <div className="flex items-center text-gray-300 mb-2">
                  <FiCalendar className="mr-2" />
                  <span className="font-medium">Date de création</span>
                </div>
                <p className="text-white font-semibold">
                  {new Date(company.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-4">
                <div className="flex items-center text-gray-300 mb-2">
                  <FiClock className="mr-2" />
                  <span className="font-medium">Dernière mise à jour</span>
                </div>
                <p className="text-white font-semibold">
                  {company.updatedAt 
                    ? new Date(company.updatedAt).toLocaleDateString('fr-FR')
                    : 'N/A'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-4">
                <div className="flex items-center text-gray-300 mb-2">
                  <FiUsers className="mr-2" />
                  <span className="font-medium">Statut</span>
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  company.isActive 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {company.isActive ? "Entreprise active" : "Entreprise inactive"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <button
                onClick={() => window.location.href = '/company/applications'}
                className="flex-1 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-6 py-3 rounded-xl border border-[#FFB000]/30 font-semibold transition-all duration-300 hover:scale-105"
              >
                Voir les candidatures
              </button>
              <button
                onClick={() => window.location.href = '/company/job'}
                className="flex-1 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-6 py-3 rounded-xl border border-[#FFB000]/30 font-semibold transition-all duration-300 hover:scale-105"
              >
                Gérer les offres
              </button>
              <button
                onClick={() => window.location.href = '/company/dashboard'}
                className="flex-1 bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Tableau de bord
              </button>
            </div>
          </div>
        </div>

        {/* Informations de pied de page */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} {company.name} • Tous droits réservés</p>
          <p className="mt-1">ID: {company._id}</p>
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