import React from "react";
import { motion } from "framer-motion";
import { 
  Building, 
  Users, 
  ShieldCheck, 
  Target, 
  Zap, 
  Clock,
  MapPin,
  TrendingUp,
  FileText,
  CheckCircle,
  DollarSign,
  MessageSquare,
  Briefcase,
  Award,
  Calendar,
  Bell
} from "lucide-react";

export const Services = () => {
  const servicesForCompanies = [
    {
      icon: Users,
      title: "Recrutement Rapide",
      desc: "Trouvez des caristes qualifiés en moins de 24h selon vos besoins spécifiques",
      features: ["CV vérifiés", "Compétences validées", "Disponibilité immédiate"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Sécurité Garantie",
      desc: "Tous nos caristes sont certifiés et leurs documents vérifiés",
      features: ["CACES validé", "Assurance RC", "Contrat sécurisé"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Target,
      title: "Recherche Ciblée",
      desc: "Filtrez par compétences, localisation et disponibilité",
      features: ["Géolocalisation", "Spécialités", "Expérience"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Flexibilité Totale",
      desc: "Adaptez votre main-d'œuvre selon vos pics d'activité",
      features: ["Mission ponctuelle", "Contrat saisonnier", "Temps partiel"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const servicesForDrivers = [
    {
      icon: Briefcase,
      title: "Missions Variées",
      desc: "Accédez à des opportunités adaptées à votre profil",
      features: ["Taux compétitifs", "Entreprises sérieuses", "Types d'engins variés"],
      color: "from-[#ffb000] to-yellow-500"
    },
    {
      icon: MapPin,
      title: "Proximité Géographique",
      desc: "Travaillez près de chez vous avec nos missions locales",
      features: ["Rayon personnalisé", "Notifications locales", "Déplacements optimisés"],
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Calendar,
      title: "Gestion Flexible",
      desc: "Planifiez vos missions selon vos disponibilités",
      features: ["Calendrier intégré", "Notifications", "Gestion des congés"],
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: DollarSign,
      title: "Paiement Sécurisé",
      desc: "Recevez vos paiements rapidement et en toute sécurité",
      features: ["Garanti par LiftGrid", "Facturation simplifiée", "Suivi en temps réel"],
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const platformServices = [
    {
      icon: MessageSquare,
      title: "Messagerie Intégrée",
      desc: "Communiquez directement avec nos outils sécurisés",
      features: ["Chat en temps réel", "Notifications push", "Support dédié"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Award,
      title: "Système de Notation",
      desc: "Bénéficiez d'une communauté de confiance vérifiée",
      features: ["Avis transparents", "Badges de compétences", "Historique vérifié"],
      color: "from-rose-500 to-rose-600"
    },
    {
      icon: Bell,
      title: "Alertes Intelligentes",
      desc: "Recevez des notifications pour les missions correspondant à votre profil",
      features: ["Matching automatique", "Alertes personnalisées", "Mise à jour en temps réel"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: FileText,
      title: "Gestion Administrative",
      desc: "Simplifiez vos démarches avec nos outils dédiés",
      features: ["Contrats numériques", "Documents centralisés", "Conformité légale"],
      color: "from-violet-500 to-violet-600"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNzI3MjciIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTItLjktMi0yIC45LTIgMi0yIDItLjkgMi0yLS45LTItMi0yaC0ydjJ2MnYydjJoMnYtMnptMC0xMGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMi0uOS0yLTIgLjktMiAyLTJoMnYySDM2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Target className="w-4 h-4 text-[#ffb000]" />
              <span className="text-white/90 text-sm font-medium">NOS SERVICES</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Solutions <span className="text-[#ffb000]">sur mesure</span>
              <br />
              <span className="text-xl md:text-2xl font-normal mt-4 block text-white/80">
                Pour les entreprises et les caristes
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment LiftGrid optimise vos opérations logistiques et booste votre carrière
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services pour les entreprises */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Building className="w-8 h-8 text-gray-700" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Pour les <span className="text-[#ffb000]">entreprises</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimisez votre main-d'œuvre logistique avec nos solutions innovantes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesForCompanies.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services pour les caristes */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Users className="w-8 h-8 text-gray-700" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Pour les <span className="text-[#ffb000]">caristes</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Développez votre carrière avec des missions adaptées et une gestion simplifiée
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesForDrivers.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services de la plateforme */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <TrendingUp className="w-8 h-8 text-gray-700" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Notre <span className="text-[#ffb000]">plateforme</span>
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils innovants pour une expérience optimale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-200">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Avantages <span className="text-[#ffb000]">exclusifs</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ce qui fait de LiftGrid la solution préférée du secteur
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Rapidité",
                desc: "Mise en relation en moins de 24h",
                value: "24h"
              },
              {
                icon: ShieldCheck,
                title: "Sécurité",
                desc: "100% des profils vérifiés",
                value: "100%"
              },
              {
                icon: Zap,
                title: "Efficacité",
                desc: "Réduction des coûts de recrutement",
                value: "-40%"
              },
              {
                icon: Users,
                title: "Satisfaction",
                desc: "Taux de recommandation élevé",
                value: "95%"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#ffb000]/20 to-[#ffb000]/10 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="w-12 h-12 text-[#ffb000]" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">{feature.value}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#ffb000]/10 to-transparent rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prêt à <span className="text-[#ffb000]">transformer</span> votre expérience logistique ?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Rejoignez des centaines d'entreprises et de caristes qui font déjà confiance à LiftGrid
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#ffb000] to-[#ffcc33] text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#ffb000]/30 transition-all duration-300"
                >
                  Découvrir nos solutions
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 font-bold text-lg rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  Voir nos tarifs
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};