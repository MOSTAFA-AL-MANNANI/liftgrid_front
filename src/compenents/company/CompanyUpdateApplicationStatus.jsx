import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiArrowLeft,
  FiLoader,
  FiAlertCircle,
  FiMapPin,
  FiDollarSign,
  FiMail,
  FiPhone
} from "react-icons/fi";

export default function CompanyUpdateApplicationStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/applications/${id}`);
      setApplication(res.data);
      setSelectedStatus(res.data.status);
    } catch (err) {
      console.error("Erreur: ", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      await api.put(`/applications/${id}/status`, { status });
      
      // Animation de succès
      const statusBtn = document.querySelector(`[data-status="${status}"]`);
      if (statusBtn) {
        statusBtn.classList.add('animate-pulse', 'ring-4', 'ring-opacity-50');
        if (status === 'accepted') {
          statusBtn.classList.add('ring-green-500');
        } else {
          statusBtn.classList.add('ring-red-500');
        }
        
        setTimeout(() => {
          if (statusBtn) {
            statusBtn.classList.remove('animate-pulse', 'ring-4', 'ring-opacity-50', 'ring-green-500', 'ring-red-500');
          }
        }, 1000);
      }
      
      setTimeout(() => {
        fetchApplication();
        setShowConfirm(false);
      }, 1500);
    } catch (err) {
      alert("Erreur: " + err.response?.data?.message);
    } finally {
      setUpdating(false);
    }
  };

  const confirmUpdate = (status) => {
    setSelectedStatus(status);
    setShowConfirm(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'accepted': return <FiCheckCircle className="text-2xl" />;
      case 'rejected': return <FiXCircle className="text-2xl" />;
      case 'pending': return <FiLoader className="text-2xl" />;
      default: return <FiAlertCircle className="text-2xl" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Rejetée';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement de la candidature...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
          <FiAlertCircle className="text-6xl text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Candidature non trouvée</h2>
          <p className="text-gray-300 mb-6">La candidature demandée n'existe pas ou a été supprimée.</p>
          <button
            onClick={() => navigate('/company/applications')}
            className="bg-[#FFB000] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Retour aux candidatures
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
          onClick={() => navigate('/company/applications')}
          className="flex items-center gap-2 text-[#FFB000] hover:text-[#FF8C00] mb-8 transition-all duration-300 hover:gap-3"
        >
          <FiArrowLeft />
          <span className="font-semibold">Retour aux candidatures</span>
        </button>

        {/* En-tête */}
        <div className="mb-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mettre à jour le <span className="text-[#FFB000]">statut</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Modifiez le statut de cette candidature et informez le candidat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Informations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte de l'offre d'emploi */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 animate-slideUp">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                  <FiBriefcase className="text-2xl text-[#FFB000]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Offre d'emploi</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{application.job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center text-gray-300">
                      <FiMapPin className="mr-2" />
                      <span>{application.job.city}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiDollarSign className="mr-2" />
                      <span>{application.job.salary ? `${application.job.salary} MAD` : "Non spécifié"}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FiClock className="mr-2" />
                      <span>{application.job.experienceRequired ? `${application.job.experienceRequired} ans` : "Non requis"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

{/* --- Informations du candidat --- */}
<div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 animate-slideUp">
  <div className="flex items-center gap-3 mb-6">
    <div className="bg-[#FFB000]/20 p-3 rounded-xl">
      <FiUser className="text-2xl text-[#FFB000]" />
    </div>
    <h2 className="text-2xl font-bold text-white">Informations du candidat</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Nom complet */}
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
      <p className="text-gray-300 text-sm mb-1">Nom complet</p>
      <p className="text-white text-lg font-semibold">
        {application.driver.fullName}
      </p>
    </div>

    {/* Email */}
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
      <p className="text-gray-300 text-sm mb-1">Email</p>
      <p className="text-white">{application.driver.email}</p>
    </div>

    {/* Téléphone */}
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
      <p className="text-gray-300 text-sm mb-1">Téléphone</p>
      <p className="text-white">
        {application.driver.phone || "Non disponible"}
      </p>
    </div>

    {/* Expérience */}
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition">
      <p className="text-gray-300 text-sm mb-1">Expérience</p>
      <p className="text-white">
        {application.driver.experienceYears
          ? `${application.driver.experienceYears} ans`
          : "Non spécifié"}
      </p>
    </div>
  </div>

  {/* --- Boutons CV & Certifications --- */}
  <div className="mt-6 flex flex-col md:flex-row gap-4">
    
    {/* Télécharger CV */}
    <button
      onClick={() =>
        window.open(`/drivers/${application.driver._id}/cv`, "_blank")
      }
      className="flex-1 bg-[#FFB000]/20 border border-[#FFB000]/40 text-[#FFB000] px-6 py-3 rounded-xl 
                 font-semibold flex items-center justify-center gap-2 
                 hover:bg-[#FFB000]/30 transition-all duration-300 hover:scale-105"
    >
      <FiMail className="text-xl" />
      Télécharger CV
    </button>

    {/* Télécharger Certifications */}
    <button
      onClick={() =>
        window.open(`/drivers/${application.driver._id}/certifications`, "_blank")
      }
      className="flex-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 px-6 py-3 rounded-xl 
                 font-semibold flex items-center justify-center gap-2 
                 hover:bg-blue-500/30 transition-all duration-300 hover:scale-105"
    >
      <FiCheckCircle className="text-xl" />
      Certifications
    </button>
  </div>
</div>

          </div>

          {/* Colonne droite - Mise à jour du statut */}
          <div className="animate-slideUp">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sticky top-6">
              {/* Statut actuel */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Statut actuel</h3>
                <div className={`p-4 rounded-xl border flex items-center justify-center ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  <span className="text-xl font-bold ml-2">{getStatusText(application.status)}</span>
                </div>
              </div>

              {/* Actions de mise à jour */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Changer le statut</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Sélectionnez le nouveau statut pour cette candidature
                </p>
                
                <div className="space-y-4">
                  <button
                    data-status="accepted"
                    onClick={() => confirmUpdate('accepted')}
                    disabled={updating}
                    className="w-full flex items-center justify-between p-4 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center">
                      <FiCheckCircle className="text-2xl mr-3" />
                      <div className="text-left">
                        <p className="font-bold text-lg">Accepter</p>
                        <p className="text-sm text-green-300">Marquer comme acceptée</p>
                      </div>
                    </div>
                  </button>

                  <button
                    data-status="rejected"
                    onClick={() => confirmUpdate('rejected')}
                    disabled={updating}
                    className="w-full flex items-center justify-between p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center">
                      <FiXCircle className="text-2xl mr-3" />
                      <div className="text-left">
                        <p className="font-bold text-lg">Refuser</p>
                        <p className="text-sm text-red-300">Marquer comme rejetée</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Information */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start">
                  <FiAlertCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-blue-300 text-sm">
                    Le candidat sera automatiquement informé du changement de statut par email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-md w-full p-6 animate-scaleUp">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                {selectedStatus === 'accepted' ? (
                  <FiCheckCircle className="text-3xl text-yellow-400" />
                ) : (
                  <FiXCircle className="text-3xl text-yellow-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Confirmer la mise à jour
              </h3>
              <p className="text-gray-300">
                Êtes-vous sûr de vouloir {selectedStatus === 'accepted' ? 'accepter' : 'refuser'} cette candidature ?
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Annuler
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedStatus)}
                disabled={updating}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  selectedStatus === 'accepted'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {updating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Mise à jour...
                  </>
                ) : (
                  `Oui, ${selectedStatus === 'accepted' ? 'accepter' : 'refuser'}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}