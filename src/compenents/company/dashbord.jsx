import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  FiBriefcase,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
  FiUser,
  FiSettings,
  FiPlus,
  FiList,
  FiEye,
  FiTrendingUp,
  FiBell,
  FiClock,
  FiBarChart2,
  FiGrid,
  FiActivity
} from "react-icons/fi";

export default function DashboardCompany() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const navigate = useNavigate();

  const company = JSON.parse(localStorage.getItem("company") || "{}");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1) Récupérer toutes les offres de la company
        const jobsRes = await api.get(`/companies/${company._id}/jobs`);
        const jobs = jobsRes.data || [];

        const totalJobs = jobs.length;
        const activeJobs = jobs.filter(j => j.isActive).length;
        const inactiveJobs = totalJobs - activeJobs;

        // 2) Récupérer toutes les candidatures de la company
        const appsRes = await api.get(`/companies/${company._id}/applications`);
        const applications = appsRes.data || [];
        const totalApplications = applications.length;
        const pendingApplications = applications.filter(app => app.status === 'pending').length;
        const acceptedApplications = applications.filter(app => app.status === 'accepted').length;

        // 3) Récupérer l'activité récente
        const recentApps = applications.slice(0, 5).map(app => ({
          id: app._id,
          type: 'candidature',
          title: `Nouvelle candidature pour "${app.job.title}"`,
          driver: app.driver.name,
          time: new Date(app.createdAt).toLocaleDateString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          status: app.status
        }));

        setRecentActivity(recentApps);
        setStats({ 
          totalJobs, 
          activeJobs, 
          inactiveJobs, 
          totalApplications,
          pendingApplications,
          acceptedApplications
        });
      } catch (err) {
        console.error("Erreur Dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (company._id) {
      fetchDashboardData();
    } else {
      navigate("/company/login");
    }
  }, [company, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement du tableau de bord...</p>
          <p className="text-gray-400 text-sm mt-2">Préparation de vos données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec infos entreprise */}
        <div className="mb-10 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Tableau de bord
                <span className="text-[#FFB000]"> {company.name || "Entreprise"}</span>
              </h1>
              <p className="text-gray-300 text-lg">
                Gérez vos offres et suivez vos candidatures en temps réel
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4">
                <p className="text-gray-300 text-sm">Connecté en tant que</p>
                <p className="text-white font-semibold">{company.email}</p>
              </div>
            </div>
          </div>

          {/* Indicateur rapide */}
          <div className="bg-gradient-to-r from-[#FFB000]/10 to-[#FF8C00]/10 rounded-2xl border border-[#FFB000]/20 p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#FFB000] p-3 rounded-xl">
                <FiBell className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Bienvenue sur votre espace</h3>
                <p className="text-gray-300">
                  Vous avez {stats.pendingApplications} candidature{stats.pendingApplications > 1 ? 's' : ''} en attente de traitement
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slideUp">
          {/* Total offres */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                <FiBriefcase className="text-2xl text-[#FFB000]" />
              </div>
              <FiTrendingUp className="text-xl text-green-400" />
            </div>
            <h3 className="text-gray-300 text-sm mb-2">Total Offres</h3>
            <p className="text-4xl font-bold text-white mb-1">{stats.totalJobs}</p>
            <p className="text-gray-400 text-sm">Offres publiées</p>
          </div>

          {/* Offres actives */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl group-hover:bg-green-500/30 transition-colors">
                <FiCheckCircle className="text-2xl text-green-400" />
              </div>
              <FiActivity className="text-xl text-green-400" />
            </div>
            <h3 className="text-gray-300 text-sm mb-2">Offres Actives</h3>
            <p className="text-4xl font-bold text-white mb-1">{stats.activeJobs}</p>
            <p className="text-gray-400 text-sm">Actuellement visibles</p>
          </div>

          {/* Offres inactives */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl group-hover:bg-red-500/30 transition-colors">
                <FiXCircle className="text-2xl text-red-400" />
              </div>
              <FiClock className="text-xl text-red-400" />
            </div>
            <h3 className="text-gray-300 text-sm mb-2">Offres Désactivées</h3>
            <p className="text-4xl font-bold text-white mb-1">{stats.inactiveJobs}</p>
            <p className="text-gray-400 text-sm">Non publiées</p>
          </div>

          {/* Candidatures totales */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <FiFileText className="text-2xl text-blue-400" />
              </div>
              <FiBarChart2 className="text-xl text-blue-400" />
            </div>
            <h3 className="text-gray-300 text-sm mb-2">Candidatures</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-white">{stats.totalApplications}</p>
              <div className="flex gap-1 text-sm">
                <span className="text-green-400">+{stats.acceptedApplications}</span>
                <span className="text-gray-400">/</span>
                <span className="text-yellow-400">{stats.pendingApplications}</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Total reçues</p>
          </div>
        </div>

        {/* Grille des actions principales */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FiGrid className="mr-3 text-[#FFB000]" />
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
            <Link
              to="/company/job"
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 hover:bg-[#FFB000]/10 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                  <FiList className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Mes Offres</h3>
                  <p className="text-gray-400 text-sm">Gérer toutes vos offres</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Voir la liste complète</span>
                <div className="w-8 h-8 bg-[#FFB000]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFB000]/30 transition-colors">
                  <div className="w-2 h-2 bg-[#FFB000] rounded-full"></div>
                </div>
              </div>
            </Link>

            <Link
              to="/company/job/add"
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 hover:bg-[#FFB000]/10 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                  <FiPlus className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Nouvelle Offre</h3>
                  <p className="text-gray-400 text-sm">Publier une offre d'emploi</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Créer une nouvelle offre</span>
                <div className="w-8 h-8 bg-[#FFB000]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFB000]/30 transition-colors">
                  <div className="w-2 h-2 bg-[#FFB000] rounded-full"></div>
                </div>
              </div>
            </Link>

            <Link
              to="/company/applications"
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 hover:bg-[#FFB000]/10 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                  <FiFileText className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Candidatures</h3>
                  <p className="text-gray-400 text-sm">Consulter les candidatures</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">{stats.totalApplications} candidatures</span>
                <div className="w-8 h-8 bg-[#FFB000]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFB000]/30 transition-colors">
                  <div className="w-2 h-2 bg-[#FFB000] rounded-full"></div>
                </div>
              </div>
            </Link>

            <Link
              to="/company/detail"
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 hover:bg-[#FFB000]/10 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                  <FiEye className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Profil Public</h3>
                  <p className="text-gray-400 text-sm">Voir votre profil</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Visualiser le profil</span>
                <div className="w-8 h-8 bg-[#FFB000]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFB000]/30 transition-colors">
                  <div className="w-2 h-2 bg-[#FFB000] rounded-full"></div>
                </div>
              </div>
            </Link>

            <Link
              to="/company/profile"
              className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:border-[#FFB000]/30 hover:bg-[#FFB000]/10 transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl group-hover:bg-[#FFB000]/30 transition-colors">
                  <FiSettings className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Paramètres</h3>
                  <p className="text-gray-400 text-sm">Modifier votre profil</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Mettre à jour les infos</span>
                <div className="w-8 h-8 bg-[#FFB000]/20 rounded-full flex items-center justify-center group-hover:bg-[#FFB000]/30 transition-colors">
                  <div className="w-2 h-2 bg-[#FFB000] rounded-full"></div>
                </div>
              </div>
            </Link>

            <div className="bg-gradient-to-br from-[#FFB000]/10 to-[#FF8C00]/10 rounded-2xl border border-[#FFB000]/20 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FFB000]/20 p-3 rounded-xl">
                  <FiUser className="text-2xl text-[#FFB000]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Statistiques</h3>
                  <p className="text-gray-400 text-sm">Vos performances</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Taux de réponse</span>
                  <span className="text-white font-semibold">
                    {stats.totalApplications > 0 
                      ? Math.round((stats.acceptedApplications / stats.totalApplications) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Offres actives</span>
                  <span className="text-white font-semibold">
                    {stats.totalJobs > 0 
                      ? Math.round((stats.activeJobs / stats.totalJobs) * 100) 
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activité récente */}
        {recentActivity.length > 0 && (
          <div className="animate-slideUp">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FiClock className="mr-3 text-[#FFB000]" />
              Activité récente
            </h2>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'accepted' ? 'bg-green-500/20' :
                        activity.status === 'rejected' ? 'bg-red-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        <FiFileText className={
                          activity.status === 'accepted' ? 'text-green-400' :
                          activity.status === 'rejected' ? 'text-red-400' :
                          'text-yellow-400'
                        } />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{activity.title}</h4>
                        <p className="text-gray-400 text-sm">{activity.driver} • {activity.time}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      activity.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      activity.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {activity.status === 'accepted' ? 'Accepté' :
                       activity.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <Link
                  to="/company/applications"
                  className="text-[#FFB000] hover:text-[#FF8C00] font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Voir toutes les candidatures
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Tableau de bord entreprise • Dernière mise à jour aujourd'hui</p>
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