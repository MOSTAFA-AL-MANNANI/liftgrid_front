import React, { useState } from "react";
import api from "../../api";
import { FiBriefcase, FiFileText, FiMapPin, FiDollarSign, FiStar, FiPlus } from "react-icons/fi";

export default function AddJob() {
  const company = JSON.parse(localStorage.getItem("company"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    salary: "",
    experienceRequired: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.post("/jobs", {
        companyId: company._id,
        ...form,
      });
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      setForm({ 
        title: "", 
        description: "", 
        city: "", 
        salary: "", 
        experienceRequired: "" 
      });
      
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* En-tête avec animation */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Publier une <span className="text-[#FFB000]">Offre</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Remplissez les détails pour attirer les meilleurs talents
          </p>
        </div>

        {/* Carte du formulaire */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl animate-slideUp">
          {/* Indicateur de succès */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-pulse">
              <p className="text-green-400 text-center font-semibold">
                ✓ Offre publiée avec succès !
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div className="group">
              <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                <FiBriefcase className="mr-2 text-[#FFB000]" />
                Titre du poste
              </label>
              <input
                name="title"
                placeholder="Ex: Développeur Full Stack"
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                         placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 
                         focus:ring-[#FFB000]/30 transition-all duration-300 group-hover:border-gray-600"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="group">
              <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                <FiFileText className="mr-2 text-[#FFB000]" />
                Description
              </label>
              <textarea
                name="description"
                placeholder="Décrivez les responsabilités, missions et aspects techniques..."
                rows="6"
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                         placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 
                         focus:ring-[#FFB000]/30 transition-all duration-300 resize-none group-hover:border-gray-600"
                value={form.description}
                onChange={handleChange}
                required
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
                placeholder="Ex: Paris, Lyon, Marseille..."
                className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                         placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 
                         focus:ring-[#FFB000]/30 transition-all duration-300 group-hover:border-gray-600"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Salaire et Expérience - Grille responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salaire */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiDollarSign className="mr-2 text-[#FFB000]" />
                  Salaire annuel (€)
                </label>
                <div className="relative">
                  <input
                    name="salary"
                    type="number"
                    placeholder="Ex: 45000"
                    className="w-full p-4 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                             placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 
                             focus:ring-[#FFB000]/30 transition-all duration-300 group-hover:border-gray-600"
                    value={form.salary}
                    onChange={handleChange}
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                </div>
              </div>

              {/* Expérience */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-medium">
                  <FiStar className="mr-2 text-[#FFB000]" />
                  Expérience requise (années)
                </label>
                <input
                  name="experienceRequired"
                  type="number"
                  placeholder="Ex: 3"
                  min="0"
                  step="0.5"
                  className="w-full p-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white 
                           placeholder-gray-500 focus:outline-none focus:border-[#FFB000] focus:ring-2 
                           focus:ring-[#FFB000]/30 transition-all duration-300 group-hover:border-gray-600"
                  value={form.experienceRequired}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 
                        transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center
                        ${isSubmitting 
                          ? 'bg-[#FFB000]/70 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-[#FFB000] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFB000]'
                        }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Publication en cours...
                </>
              ) : (
                <>
                  <FiPlus className="mr-3 text-xl" />
                  Publier l'offre
                </>
              )}
            </button>

            {/* Aide visuelle */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm text-center">
                L'offre sera visible immédiatement sur la plateforme
              </p>
            </div>
          </form>
        </div>

        {/* Section d'info supplémentaire */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-[#FFB000] font-bold">📋</div>
            <p className="text-gray-300 mt-2">Formulaire clair et complet</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-[#FFB000] font-bold">⚡</div>
            <p className="text-gray-300 mt-2">Publication instantanée</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <div className="text-[#FFB000] font-bold">👥</div>
            <p className="text-gray-300 mt-2">Visible par tous les candidats</p>
          </div>
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
          animation: slideUp 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}