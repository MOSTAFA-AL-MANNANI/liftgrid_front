import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiUpload,
  FiSave,
  FiUser,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCamera,
  FiArrowLeft,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

export default function UpdateCompany() {
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({});
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [logoChanged, setLogoChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Charger company depuis API
  useEffect(() => {
    const stored = localStorage.getItem("company");
    if (!stored) return;

    const comp = JSON.parse(stored);

    api.get(`/companies/${comp._id}`)
      .then((res) => {
        setCompany(res.data);
        setForm(res.data);
        if (res.data.logo) {
          setPreview(`data:${res.data.logo.contentType};base64,${res.data.logo.data}`);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("La taille du fichier ne doit pas dépasser 5MB");
      return;
    }

    setLogo(file);
    setLogoChanged(true);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.keys(form).forEach(key => { 
      if (key !== "logo" && form[key] !== undefined) data.append(key, form[key]); 
    });
    if (logoChanged && logo) data.append("logo", logo);

    try {
      const res = await api.put(`/companies/${company._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setCompany(res.data.company);
      setLogoChanged(false);
      
      // Mettre à jour le localStorage
      localStorage.setItem("company", JSON.stringify(res.data.company));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      alert("Erreur : " + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    setPreview(null);
    setLogoChanged(true);
  };

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
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <FiAlertCircle className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Entreprise non trouvée</h2>
          <p className="text-gray-300 mb-6">Impossible de charger les informations de l'entreprise</p>
          <button
            onClick={() => navigate('/company/dashboard')}
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
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FFB000] hover:text-[#FF8C00] mb-8 transition-all duration-300 hover:gap-3"
        >
          <FiArrowLeft />
          <span className="font-semibold">Retour</span>
        </button>

        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Modifier <span className="text-[#FFB000]">l'entreprise</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Mettez à jour les informations de votre entreprise
          </p>
        </div>

        {/* Message de succès */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl animate-pulse">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400 text-xl" />
              <p className="text-green-400 font-semibold">
                ✓ Informations mises à jour avec succès !
              </p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8 animate-slideUp">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche - Informations de base */}
            <div className="space-y-6">
              {/* Logo */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-white mb-4 flex items-center">
                  <FiCamera className="mr-3 text-[#FFB000]" />
                  Logo de l'entreprise
                </label>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="relative group">
                    <div className="w-48 h-48 rounded-2xl border-4 border-white/10 overflow-hidden bg-gray-800/50">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Logo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiBuilding className="text-6xl text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Effet de survol */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#FFB000]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badge changement */}
                    {logoChanged && (
                      <div className="absolute -top-2 -right-2 bg-[#FFB000] text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        Modifié
                      </div>
                    )}
                  </div>

                  {/* Actions logo */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-3 rounded-xl border border-[#FFB000]/30 cursor-pointer transition-all duration-300 hover:scale-105">
                      <FiUpload />
                      {preview ? "Changer le logo" : "Télécharger un logo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogo}
                        className="hidden"
                      />
                    </label>
                    
                    {preview && (
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-3 rounded-xl border border-red-600/30 transition-all duration-300 hover:scale-105"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm text-center">
                    Taille maximale : 5MB • Formats : JPG, PNG, GIF
                  </p>
                </div>
              </div>

              {/* Informations de contact */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FiUser className="mr-3 text-[#FFB000]" />
                  Informations de contact
                </h3>
                
                <div className="space-y-4">
                  <div className="group">
                    <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                      <FiUser className="mr-2 text-[#FFB000]" />
                      Nom de l'entreprise
                    </label>
                    <input
                      name="name"
                      value={form.name || ""}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                      placeholder="Entrez le nom de l'entreprise"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                      <FiPhone className="mr-2 text-[#FFB000]" />
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      value={form.phone || ""}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                      placeholder="Entrez le numéro de téléphone"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Informations supplémentaires */}
            <div className="space-y-6">
              {/* Localisation */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FiMapPin className="mr-3 text-[#FFB000]" />
                  Localisation
                </h3>
                
                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                    <FiMapPin className="mr-2 text-[#FFB000]" />
                    Ville
                  </label>
                  <input
                    name="city"
                    value={form.city || ""}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300"
                    placeholder="Entrez la ville"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <FiFileText className="mr-3 text-[#FFB000]" />
                  Description
                </h3>
                
                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                    <FiFileText className="mr-2 text-[#FFB000]" />
                    Description de l'entreprise
                  </label>
                  <textarea
                    name="description"
                    value={form.description || ""}
                    onChange={handleChange}
                    rows="8"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/30 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre entreprise, ses activités, sa mission..."
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Cette description sera visible par les candidats
                  </p>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Informations système</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Email principal</span>
                    <span className="text-white font-semibold">{company.email}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Numéro RC</span>
                    <span className="text-white font-semibold">{company.rcNumber}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Statut</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      company.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {company.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate('/company/detail')}
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
                  Sauvegarde en cours...
                </>
              ) : (
                <>
                  <FiSave className="text-xl" />
                  Sauvegarder les modifications
                </>
              )}
            </button>
          </div>

          {/* Note informative */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="text-blue-400 mt-1 flex-shrink-0" />
              <p className="text-blue-300 text-sm">
                Toutes les modifications seront immédiatement visibles sur votre profil public.
                Les candidats verront les nouvelles informations lors de leur prochaine visite.
              </p>
            </div>
          </div>
        </form>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Mise à jour du profil • Tous droits réservés</p>
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