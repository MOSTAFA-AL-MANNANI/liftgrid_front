import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiClock,
  FiFileText,
  FiAward,
  FiUpload,
  FiSave,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiEye,
  FiDownload
} from "react-icons/fi";

export default function UpdateDriver() {
  const [driver, setDriver] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    experienceYears: "",
    city: ""
  });
  const [cv, setCv] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [certificationsPreview, setCertificationsPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // récupérer driver ID depuis localStorage
  const driverId = JSON.parse(localStorage.getItem("driver") || "{}")?._id;

  useEffect(() => {
    if (!driverId) {
      setError("Aucun chauffeur trouvé dans la session");
      setLoading(false);
      return;
    }

    api.get(`/drivers/${driverId}`)
      .then(res => {
        setDriver(res.data);
        setForm({
          fullName: res.data.fullName || "",
          phone: res.data.phone || "",
          experienceYears: res.data.experienceYears || "",
          city: res.data.city || ""
        });
        
        // Si des fichiers existent déjà, créer des URLs de prévisualisation
        if (res.data.cv) {
          setCvPreview(`${api.defaults.baseURL}/drivers/${driverId}/cv`);
        }
        if (res.data.certifications) {
          setCertificationsPreview(`${api.defaults.baseURL}/drivers/${driverId}/certifications`);
        }
      })
      .catch(err => {
        console.error("Erreur API:", err);
        setError("Impossible de charger les informations du chauffeur");
      })
      .finally(() => setLoading(false));
  }, [driverId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (setter, setPreview) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification de la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("La taille du fichier ne doit pas dépasser 10MB");
      return;
    }

    // Vérification du type (PDF uniquement)
    if (file.type !== "application/pdf") {
      setError("Seuls les fichiers PDF sont acceptés");
      return;
    }

    setter(file);
    setError("");
    
    // Créer une URL de prévisualisation
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const removeFile = (setter, setPreview) => {
    setter(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driverId) {
      setError("Identifiant du chauffeur introuvable");
      return;
    }

    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("phone", form.phone);
    data.append("experienceYears", form.experienceYears);
    data.append("city", form.city);

    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    setSubmitting(true);
    setError("");
    
    try {
      const res = await api.put(`/drivers/${driverId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Mettre à jour le localStorage avec les nouvelles données
      const updatedDriver = { ...driver, ...res.data.updated };
      localStorage.setItem("driver", JSON.stringify(updatedDriver));
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/driver/profile/voir');
      }, 2000);
      
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!driver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <FiAlertCircle className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Chauffeur non trouvé</h2>
          <p className="text-gray-300 mb-6">Impossible de charger les informations du chauffeur</p>
          <button
            onClick={() => navigate('/driver/dashboard')}
            className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/driver/profile/voir')}
          className="flex items-center gap-2 text-[#FFB000] hover:text-[#FF8C00] mb-8 transition-all duration-300 hover:gap-3"
        >
          <FiArrowLeft />
          <span className="font-semibold">Retour au profil</span>
        </button>

        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modifier mon <span className="text-[#FFB000]">profil</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Mettez à jour vos informations personnelles et professionnelles
          </p>
        </div>

        {/* Message de succès */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl animate-pulse">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400 text-xl" />
              <p className="text-green-400 font-semibold">
                ✓ Profil mis à jour avec succès !
              </p>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-red-400 text-xl" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8 animate-slideUp">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche - Informations personnelles */}
            <div className="space-y-6">
              {/* Nom complet */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiUser className="mr-2 text-[#FFB000]" />
                  Nom complet
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiPhone className="mr-2 text-[#FFB000]" />
                  Téléphone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Votre numéro de téléphone"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                  required
                />
              </div>

              {/* Expérience */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiClock className="mr-2 text-[#FFB000]" />
                  Années d'expérience
                </label>
                <input
                  name="experienceYears"
                  type="number"
                  min="0"
                  max="50"
                  value={form.experienceYears}
                  onChange={handleChange}
                  placeholder="Nombre d'années d'expérience"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                />
              </div>

              {/* Ville */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiMapPin className="mr-2 text-[#FFB000]" />
                  Ville
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Votre ville de résidence"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Colonne droite - Documents */}
            <div className="space-y-6">
              {/* CV */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4 flex items-center">
                  <FiFileText className="mr-3 text-[#FFB000]" />
                  Curriculum Vitae (CV)
                </label>
                
                <div className="space-y-4">
                  {cvPreview ? (
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-green-400">
                          <FiCheckCircle className="mr-2" />
                          <span className="font-medium">CV disponible</span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={cvPreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFB000] hover:text-[#FF8C00] transition-colors"
                            title="Visualiser"
                          >
                            <FiEye className="text-lg" />
                          </a>
                          <a
                            href={cvPreview}
                            download
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="Télécharger"
                          >
                            <FiDownload className="text-lg" />
                          </a>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Un CV est déjà enregistré</p>
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center text-yellow-400 mb-2">
                        <FiAlertCircle className="mr-2" />
                        <span className="font-medium">CV non disponible</span>
                      </div>
                      <p className="text-gray-400 text-sm">Téléchargez un CV pour augmenter vos chances</p>
                    </div>
                  )}
                  
                  <label className="flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 cursor-pointer transition-all duration-300 hover:scale-105">
                    <FiUpload />
                    {cv ? "Changer le CV" : "Télécharger un CV"}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFile(setCv, setCvPreview)}
                      className="hidden"
                    />
                  </label>
                  
                  {cv && (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FiFileText className="text-green-400" />
                        <div>
                          <p className="text-white font-medium">{cv.name}</p>
                          <p className="text-green-300 text-sm">
                            {(cv.size / 1024 / 1024).toFixed(2)} MB • Nouveau fichier
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(setCv, setCvPreview)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="block text-lg font-semibold text-white mb-4 flex items-center">
                  <FiAward className="mr-3 text-[#FFB000]" />
                  Certifications
                </label>
                
                <div className="space-y-4">
                  {certificationsPreview ? (
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-green-400">
                          <FiCheckCircle className="mr-2" />
                          <span className="font-medium">Certifications disponibles</span>
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={certificationsPreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFB000] hover:text-[#FF8C00] transition-colors"
                            title="Visualiser"
                          >
                            <FiEye className="text-lg" />
                          </a>
                          <a
                            href={certificationsPreview}
                            download
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="Télécharger"
                          >
                            <FiDownload className="text-lg" />
                          </a>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Des certifications sont déjà enregistrées</p>
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center text-yellow-400 mb-2">
                        <FiAlertCircle className="mr-2" />
                        <span className="font-medium">Certifications non disponibles</span>
                      </div>
                      <p className="text-gray-400 text-sm">Ajoutez vos certifications pour renforcer votre profil</p>
                    </div>
                  )}
                  
                  <label className="flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 cursor-pointer transition-all duration-300 hover:scale-105">
                    <FiUpload />
                    {certifications ? "Changer les certifications" : "Ajouter des certifications"}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFile(setCertifications, setCertificationsPreview)}
                      className="hidden"
                    />
                  </label>
                  
                  {certifications && (
                    <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FiAward className="text-green-400" />
                        <div>
                          <p className="text-white font-medium">{certifications.name}</p>
                          <p className="text-green-300 text-sm">
                            {(certifications.size / 1024 / 1024).toFixed(2)} MB • Nouveau fichier
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(setCertifications, setCertificationsPreview)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations */}
              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-4">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="text-[#FFB000] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">Informations importantes</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Formats acceptés : PDF uniquement</li>
                      <li>• Taille maximale : 10MB par fichier</li>
                      <li>• Les documents seront visibles par les employeurs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate('/driver/profile/voir')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                submitting 
                  ? 'bg-[#FFB000]/70 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#FFB000] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFB000] text-white'
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Mise à jour en cours...
                </>
              ) : (
                <>
                  <FiSave className="text-xl" />
                  Sauvegarder les modifications
                </>
              )}
            </button>
          </div>
        </form>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Mise à jour du profil chauffeur • Tous droits réservés</p>
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