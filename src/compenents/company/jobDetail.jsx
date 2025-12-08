import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiMail,
  FiFileText,
  FiArrowLeft,
  FiEye,
  FiUsers,
  FiCheckCircle,
  FiEdit,
  FiShare2
} from "react-icons/fi";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationsCount, setApplicationsCount] = useState(0);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const [jobRes, appsRes] = await Promise.all([
        api.get(`/jobs/${id}`),
        api.get(`/jobs/${id}/applications`)
      ]);
      
      setJob(jobRes.data);
      setApplicationsCount(appsRes.data.length || 0);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const handleViewApplications = () => {
    navigate(`/company/job/${id}/applications`);
  };

  const handleEditJob = () => {
    navigate(`/company/job/${id}/edit`);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des détails de l'offre...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <FiBriefcase className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Offre non trouvée</h2>
          <p className="text-gray-300 mb-6">Cette offre d'emploi n'existe pas ou a été supprimée.</p>
          <button
            onClick={() => navigate('/company/job')}
            className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Retour aux offres
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
            Détails de <span className="text-[#FFB000]">l'offre</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Consultez toutes les informations sur cette offre d'emploi
          </p>
        </div>

        {/* Carte principale */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden animate-slideUp">
          {/* En-tête avec titre et statut */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                    <FiBriefcase className="text-2xl text-[#FFB000]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{job.title}</h2>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <div className="flex items-center text-gray-300">
                        
                        <span>{job.company.name}</span>
                      </div>
                      <div className={`flex items-center px-3 py-1 rounded-full ${
                        job.isActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        <FiCheckCircle className="mr-1" />
                        <span className="text-sm">{job.isActive ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions rapides */}
              <div className="flex gap-3">
                <button
                  onClick={handleEditJob}
                  className="flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-2 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105"
                >
                  <FiEdit />
                  Modifier
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-4 py-2 rounded-xl border border-[#FFB000]/30 transition-all duration-300 hover:scale-105"
                >
                  <FiShare2 />
                  Partager
                </button>
              </div>
            </div>

            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-2">
                  <FiMapPin className="text-[#FFB000] mr-2" />
                  <h3 className="text-gray-300 text-sm">Localisation</h3>
                </div>
                <p className="text-xl font-bold text-white">{job.city}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-2">
                  <FiDollarSign className="text-[#FFB000] mr-2" />
                  <h3 className="text-gray-300 text-sm">Salaire annuel</h3>
                </div>
                <p className="text-xl font-bold text-white">{formatSalary(job.salary)}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-2">
                  <FiClock className="text-[#FFB000] mr-2" />
                  <h3 className="text-gray-300 text-sm">Expérience requise</h3>
                </div>
                <p className="text-xl font-bold text-white">
                  {job.experienceRequired ? `${job.experienceRequired} ans` : "Non requis"}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-center mb-2">
                  <FiUsers className="text-[#FFB000] mr-2" />
                  <h3 className="text-gray-300 text-sm">Candidatures</h3>
                </div>
                <p className="text-xl font-bold text-white">{applicationsCount}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <FiFileText className="mr-3 text-[#FFB000]" />
              Description du poste
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {job.description || "Aucune description fournie pour cette offre."}
                </p>
              </div>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Informations de l'entreprise */}
              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  
                  Informations de l'entreprise
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Nom de l'entreprise</p>
                    <p className="text-white font-semibold text-lg">{job.company.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Email de contact</p>
                    <div className="flex items-center text-white">
                      <FiMail className="mr-2" />
                      <span>{job.company.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métadonnées */}
              <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-xl border border-[#FFB000]/20 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FiCalendar className="mr-3 text-[#FFB000]" />
                  Informations de publication
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Date de création</p>
                    <p className="text-white font-semibold">{formatDate(job.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Dernière mise à jour</p>
                    <p className="text-white font-semibold">
                      {job.updatedAt ? formatDate(job.updatedAt) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-1">Référence</p>
                    <p className="text-white font-semibold truncate">{job._id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions principales */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <button
                onClick={handleViewApplications}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 group/btn"
              >
                <FiEye className="group-hover/btn:scale-110 transition-transform" />
                Voir les candidatures ({applicationsCount})
              </button>
              <button
                onClick={() => window.location.href = '/company/job'}
                className="flex-1 flex items-center justify-center gap-2 bg-[#FFB000]/20 hover:bg-[#FFB000]/30 text-[#FFB000] px-6 py-4 rounded-xl border border-[#FFB000]/30 font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Retour à la liste
              </button>
            </div>
          </div>
        </div>

        {/* Note informative */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center animate-fadeIn">
          <div className="flex items-center justify-center gap-3">
            <FiEye className="text-blue-400 text-xl" />
            <p className="text-blue-300">
              Cette offre est actuellement visible par tous les chauffeurs sur la plateforme.
            </p>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Offre d'emploi • Tous droits réservés</p>
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