import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FiTruck, 
  FiArrowRight, 
  FiCheck, 
  FiUsers,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiShield
} from "react-icons/fi";
import { 
  FaWarehouse, 
  FaHandshake, 
  FaChartLine,
  FaUserTie,
  FaRegGem
} from "react-icons/fa";
import { MdOutlineHandyman, MdWorkspacePremium } from "react-icons/md";
import { TbForklift } from "react-icons/tb";



export default function ChooseRole() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const roles = [
    {
      id: "company",
      title: "Espace Entreprise",
      subtitle: "Recrutez des experts",
      description: "Trouvez les meilleurs caristes certifiés pour vos besoins logistiques",
      icon: <FaWarehouse className="w-16 h-16" />,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600",
      features: [
        "Accès à 500+ caristes certifiés",
        "Recrutement en moins de 24h",
        "Gestion simplifiée des contrats",
        "Analyses détaillées"
      ],
      buttonText: "Accéder à l'espace",
      path: "/company/login",
      stats: { value: "200+", label: "Entreprises partenaires" }
    },
    {
      id: "driver",
      title: "Espace Cariste",
      subtitle: "Trouvez des missions",
      description: "Accédez à des missions adaptées à vos compétences et disponibilités",
      icon: <TbForklift className="w-16 h-16 " />
,
      color: "from-[#ffb000] to-yellow-500",
      hoverColor: "from-[#e69c00] to-yellow-600",
      features: [
        "Missions bien rémunérées",
        "Flexibilité totale",
        "Paiement garanti",
        "Formations certifiantes"
      ],
      buttonText: "Rejoindre comme cariste",
      path: "/driver/login",
      stats: { value: "500+", label: "Caristes actifs" }
    }
  ];

  const handleCardClick = (role) => {
    setSelectedCard(role.id);
    setTimeout(() => {
      navigate(role.path);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const iconVariants = {
    initial: { rotateY: 0 },
    hover: { 
      rotateY: 180,
      transition: { duration: 0.6, type: "spring" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#ffb000]/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-[#ffb000] to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaHandshake className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Bienvenue sur <span className="text-[#ffb000]">LiftGrid</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connectez vos talents aux meilleures opportunités dans le secteur logistique
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(role)}
              className={`relative cursor-pointer group ${
                selectedCard === role.id ? "ring-4 ring-white/20" : ""
              }`}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Card Content */}
              <div className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-10 h-full overflow-hidden transition-all duration-300 group-hover:border-gray-600 group-hover:shadow-2xl group-hover:shadow-black/50">
                
                {/* Icon with 3D effect */}
                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  animate={hoveredCard === role.id ? "hover" : "initial"}
                  className="relative w-24 h-24 mx-auto mb-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  <div className={`relative w-24 h-24 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-3 transition-transform duration-300`}>
                    <div className="text-white">
                      {role.icon}
                    </div>
                  </div>
                </motion.div>

                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${
                    role.id === "company" 
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                      : "bg-[#ffb000]/20 text-yellow-300 border border-[#ffb000]/30"
                  }`}>
                    {role.id === "company" ? "Recruteur" : "Talent"}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {role.title}
                  </h2>
                  <p className="text-gray-400 mb-3">{role.subtitle}</p>
                  <p className="text-gray-300 text-lg">
                    {role.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {role.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    role.id === "company"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      : "bg-gradient-to-r from-[#ffb000] to-yellow-500 hover:from-[#e69c00] hover:to-yellow-600 text-black"
                  } shadow-lg hover:shadow-xl`}
                >
                  <span>{role.buttonText}</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>

                {/* Hover Effect Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating particles on hover */}
              <AnimatePresence>
                {hoveredCard === role.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50]
                        }}
                        transition={{ 
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                        className={`absolute w-2 h-2 rounded-full ${
                          role.id === "company" ? "bg-blue-400" : "bg-yellow-400"
                        }`}
                        style={{
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Middle Separator - Only on large screens */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="relative">
            <div className="w-px h-64 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-sm font-bold">OU</span>
              </div>
            </div>
        </div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10 mb-6">
            {[
              { icon: <FiUsers />, text: "Communauté active" },
              { icon: <FiShield />, text: "Sécurité garantie" },
              { icon: <FiDollarSign />, text: "Paiements sécurisés" },
              { icon: <FiMapPin />, text: "France entière" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                <span className="text-[#ffb000]">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            LiftGrid est la plateforme de référence pour la mise en relation entre entreprises 
            et caristes qualifiés. Rejoignez notre réseau de professionnels.
          </p>
          
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <span>Retour à l'accueil</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}