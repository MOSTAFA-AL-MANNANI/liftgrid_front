import { useEffect, useState } from "react";
import api from "../api";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiFileText,
  FiAward,
  FiDownload,
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiStar,
  FiBriefcase,
  FiNavigation,
  FiActivity
} from "react-icons/fi";

export default function DriverDetail() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("driver");
    if (!stored) {
      setError("Aucun chauffeur trouvé dans la session");
      setLoading(false);
      return;
    }

    let driverId = null;
    try {
      driverId = JSON.parse(stored)?._id;
    } catch (e) {
      setError("Impossible de lire les informations du chauffeur");
      setLoading(false);
      return;
    }

    if (!driverId) {
      setError("Identifiant du chauffeur invalide");
      setLoading(false);
      return;
    }

    // API pour récupérer les infos du driver
    api.get(`/drivers/${driverId}`)
      .then(res => {
        setDriver(res.data);
        
        // Calcul du pourcentage de complétion du profil
        const fields = [
          res.data.fullName,
          res.data.phone,
          res.data.email,
          res.data.city,
          res.data.experienceYears,
          res.data.cv,
          res.data.certifications
        ];
        const filledFields = fields.filter(field => field).length;
        const completion = Math.round((filledFields / fields.length) * 100);
        setProfileCompletion(completion);
        
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <FiActivity className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Erreur de chargement</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/driver/dashboard'}
            className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  const driverId = driver._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mon <span className="text-[#FFB000]">profil</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Consultez et gérez vos informations personnelles
          </p>
        </div>

        {/* Progression du profil */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8 animate-slideUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Complétion du profil</h3>
              <div className="flex items-center gap-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#FFB000] to-[#FF8C00] h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <span className="text-2xl font-bold text-[#FFB000] whitespace-nowrap">
                  {profileCompletion}%
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {profileCompletion < 100 
                  ? "Complétez votre profil pour augmenter vos chances d'être sélectionné"
                  : "Félicitations ! Votre profil est complet ✓"
                }
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/driver/profile'}
              className="flex items-center gap-2 bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <FiEdit />
              Mettre à jour
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations personnelles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carte informations personnelles */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden animate-slideUp">
              <div className="p-6 md:p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                    <FiUser className="text-2xl text-[#FFB000]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Informations personnelles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-2 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiUser className="text-xl text-[#FFB000]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white ml-3">Nom complet</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">{driver.fullName}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-2 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiPhone className="text-xl text-[#FFB000]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white ml-3">Téléphone</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">{driver.phone}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-2 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiMail className="text-xl text-[#FFB000]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white ml-3">Email</h3>
                    </div>
                    <p className="text-xl text-white truncate">{driver.email}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-2 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiMapPin className="text-xl text-[#FFB000]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white ml-3">Ville</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">{driver.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte expérience professionnelle */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden animate-slideUp">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                    <FiBriefcase className="text-2xl text-[#FFB000]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Expérience professionnelle</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-6">
                    <div className="flex items-center mb-4">
                      <FiClock className="text-2xl text-[#FFB000] mr-3" />
                      <h3 className="text-xl font-semibold text-white">Années d'expérience</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">{driver.experienceYears || 0}</span>
                      <span className="text-gray-300 text-lg">ans</span>
                    </div>
                    <div className="mt-4 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`text-xl ${i < Math.min(driver.experienceYears || 0, 5) ? 'text-[#FFB000]' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-6">
                    <div className="flex items-center mb-4">
                      <FiCalendar className="text-2xl text-[#FFB000] mr-3" />
                      <h3 className="text-xl font-semibold text-white">Date d'inscription</h3>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {new Date(driver.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Membre depuis {Math.floor((new Date() - new Date(driver.createdAt)) / (1000 * 60 * 60 * 24 * 30))} mois
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden animate-slideUp">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                    <FiFileText className="text-2xl text-[#FFB000]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Documents professionnels</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CV */}
                  <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiFileText className="text-2xl text-[#FFB000]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-white">Curriculum Vitae</h3>
                        <p className="text-gray-400 text-sm">Votre CV professionnel</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`${api.defaults.baseURL}/drivers/${driverId}/cv`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                      >
                        <FiEye className="group-hover/btn:scale-110 transition-transform" />
                        Visualiser
                      </a>
                      <a
                        href={`${api.defaults.baseURL}/drivers/${driverId}/cv`}
                        download
                        className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                      >
                        <FiDownload className="group-hover/btn:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#FFB000]/20 p-3 rounded-lg group-hover:bg-[#FFB000]/30 transition-colors">
                        <FiAward className="text-2xl text-[#FFB000]" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-white">Certifications</h3>
                        <p className="text-gray-400 text-sm">Vos diplômes et certifications</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`${api.defaults.baseURL}/drivers/${driverId}/certifications`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105 group/btn"
                      >
                        <FiEye className="group-hover/btn:scale-110 transition-transform" />
                        Visualiser
                      </a>
                      <a
                        href={`${api.defaults.baseURL}/drivers/${driverId}/certifications`}
                        download
                        className="flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-xl border border-blue-600/30 transition-all duration-300 hover:scale-105 group/btn"
                      >
                        <FiDownload className="group-hover/btn:scale-110 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Statistiques et actions */}
          <div className="space-y-8">
            {/* Statut du profil */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 animate-slideUp">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FiCheckCircle className="mr-3 text-[#FFB000]" />
                Statut du profil
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Profil vérifié</span>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-white text-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">CV téléchargé</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    driver.cv ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {driver.cv ? (
                      <FiCheckCircle className="text-white text-sm" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Certifications ajoutées</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    driver.certifications ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {driver.certifications ? (
                      <FiCheckCircle className="text-white text-sm" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Expérience renseignée</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    driver.experienceYears ? 'bg-green-500' : 'bg-yellow-500'
                  }`}>
                    {driver.experienceYears ? (
                      <FiCheckCircle className="text-white text-sm" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-2xl border border-[#FFB000]/20 p-6 animate-slideUp">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FiNavigation className="mr-3 text-[#FFB000]" />
                Actions rapides
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/driver/jobs'}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <FiBriefcase className="text-[#FFB000] mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-white">Parcourir les offres</p>
                      <p className="text-gray-400 text-sm">Trouver un emploi</p>
                    </div>
                  </div>
                  <div className="text-[#FFB000] group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </button>

                <button
                  onClick={() => window.location.href = '/driver/applications-status'}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <FiFileText className="text-[#FFB000] mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-white">Mes candidatures</p>
                      <p className="text-gray-400 text-sm">Suivre mes postulations</p>
                    </div>
                  </div>
                  <div className="text-[#FFB000] group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </button>

                <button
                  onClick={() => window.location.href = '/driver/profile'}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center">
                   
                    <div className="text-left">
                      <p className="font-semibold text-white">Modifier profil</p>
                      <p className="text-gray-400 text-sm">Mettre à jour mes informations</p>
                    </div>
                  </div>
                  <div className="text-[#FFB000] group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </button>
              </div>
            </div>

            {/* Informations de compte */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 animate-slideUp">
              <h3 className="text-xl font-bold text-white mb-4">Informations de compte</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>ID du compte</span>
                  <span className="text-white font-mono truncate ml-2">{driver._id}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Statut</span>
                  <span className="text-green-400 font-semibold">Actif</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Dernière mise à jour</span>
                  <span className="text-white">
                    {driver.updatedAt 
                      ? new Date(driver.updatedAt).toLocaleDateString('fr-FR')
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Profil chauffeur • Tous droits réservés</p>
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