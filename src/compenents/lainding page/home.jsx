import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Building, 
  Users, 
  Shield, 
  TrendingUp,
  Forklift,
  MapPin,
  Clock,
  Star,
  CheckCircle
} from "lucide-react";


export const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNzI3MjciIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTItLjktMi0yIC45LTIgMi0yIDItLjkgMi0yLS45LTItMi0yaC0ydjJ2MnYydjJoMnYtMnptMC0xMGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMi0uOS0yLTIgLjktMiAyLTJoMnYySDM2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Animated Elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-[#ffb000]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffb000]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <div className="w-2 h-2 bg-[#ffb000] rounded-full animate-pulse"></div>
                <span className="text-white/90 text-sm font-medium">PLATEFORME DE MISE EN RELATION</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Connectez vos compétences</span>
                <span className="block text-white">
                  aux <span className="text-[#ffb000]">besoins</span> logistiques
                </span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                LiftGrid est la plateforme qui relie les entreprises à des caristes qualifiés.
                Optimisez votre main-d'œuvre et trouvez des missions adaptées à vos compétences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/choserole"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#ffb000] text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#ffb000]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">Commencer</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#ffb000] to-[#ffcc33] rounded-xl"
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>

                <Link
                  to="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                >
                  En savoir plus
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/70 text-sm">Caristes actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">200+</div>
                  <div className="text-white/70 text-sm">Entreprises</div>
                </div>
                <div className="text-center md:col-span-1 col-span-2">
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-white/70 text-sm">Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-2xl border border-gray-800">
                {/* Animated forklift illustration */}
                <div className="relative h-80 w-full">
                  {/* You can replace this with your actual SVG/Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Forklift className="w-48 h-48 text-[#ffb000] animate-bounce" />
                  </div>
                  
                  {/* Floating badges */}
                  <motion.div
                    className="absolute top-4 left-4 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm font-medium">Disponible</span>
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-300 text-sm font-medium">Top cariste</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}

      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi <span className="text-[#ffb000]">LiftGrid</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme conçue pour répondre aux besoins spécifiques de la logistique moderne
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ffb000]/10 to-[#ffb000]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-[#ffb000]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comment ça <span className="text-[#ffb000]">marche</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, rapide et efficace pour les caristes comme pour les entreprises
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#ffb000] to-[#ffcc33] transform -translate-y-1/2"></div>

            <div className="grid lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#ffb000] to-[#ffcc33] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#ffb000]/10 to-[#ffb000]/30 rounded-2xl flex items-center justify-center mb-6 mt-4">
                      <step.icon className="w-8 h-8 text-[#ffb000]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Data
const features = [
  {
    icon: Shield,
    title: "Sécurité maximale",
    description: "Vérification des qualifications et assurance pour toutes les missions"
  },
  {
    icon: Users,
    title: "Réseau qualifié",
    description: "Accédez à des centaines de caristes certifiés et expérimentés"
  },
  {
    icon: MapPin,
    title: "Géolocalisation",
    description: "Trouvez des caristes disponibles près de votre entrepôt"
  },
  {
    icon: TrendingUp,
    title: "Optimisation",
    description: "Réduisez vos coûts et maximisez votre productivité"
  }
];

const steps = [
  {
    icon: Users,
    title: "Inscription rapide",
    description: "Créez votre profil en 5 minutes et validez vos qualifications"
  },
  {
    icon: MapPin,
    title: "Recherche ciblée",
    description: "Trouvez des missions ou des caristes selon vos critères précis"
  },
  {
    icon: Forklift,
    title: "Mise en relation",
    description: "Contactez directement les profils correspondant à vos besoins"
  },
  {
    icon: CheckCircle,
    title: "Mission réussie",
    description: "Validez la mission et évaluez l'expérience pour la communauté"
  }
];