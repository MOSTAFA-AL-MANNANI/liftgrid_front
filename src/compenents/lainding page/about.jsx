import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, 
  Users, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  Award,
  Globe,
  Heart,
  ArrowRight,
  BarChart3,
  Clock,
  Zap
} from "lucide-react";

export const About = () => {
  // URLs des images
  const aboutImageUrl = "https://certired.com/wp-content/uploads/2022/02/COML0309-organizacion-y-gestion-de-almacenes-650x650.jpg";
  const teamImageUrl = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const warehouseImageUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const logisticsImageUrl = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white">
      {/* Hero About Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${warehouseImageUrl})`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Heart className="w-4 h-4 text-[#ffb000]" />
              <span className="text-white/90 text-sm font-medium">NOTRE HISTOIRE</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Notre <span className="text-[#ffb000]">mission</span> ?
              <br />
              <span className="text-xl md:text-3xl font-normal mt-4 block">
                Révolutionner le secteur logistique
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              LiftGrid est né d'un constat simple : le monde de la logistique manquait 
              d'une plateforme dédiée pour connecter efficacement les talents aux opportunités.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre Histoire Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#ffb000]/20 to-transparent rounded-full"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src={aboutImageUrl}
                    alt="Gestion d'entrepôt et organisation logistique" 
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Floating badge */}
                  <motion.div
                    className="absolute bottom-6 right-6 bg-gradient-to-r from-[#ffb000] to-[#ffcc33] text-black px-6 py-3 rounded-full shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span className="font-bold">Depuis 2023</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Notre <span className="text-[#ffb000]">histoire</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Fondée par des experts du secteur logistique et des technologies, 
                  LiftGrid est la réponse à un besoin criant : simplifier la mise en 
                  relation entre les caristes qualifiés et les entreprises qui ont 
                  besoin de leurs compétences.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nous avons constaté que trop d'entreprises perdaient du temps à 
                  recruter des caristes, tandis que ces derniers peinaient à trouver 
                  des missions adaptées à leur expertise. LiftGrid est né de cette 
                  double problématique.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Aujourd'hui, nous connectons des centaines de professionnels à 
                  travers la France, avec une vision : devenir la référence 
                  incontournable du recrutement logistique en Europe.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#ffb000]/10 to-transparent p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Caristes actifs</div>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-transparent p-6 rounded-2xl">
                  <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
                  <div className="text-gray-600">Entreprises partenaires</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos <span className="text-[#ffb000]">valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui nous guide au quotidien et définit notre engagement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#ffb000]/10 to-[#ffb000]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <value.icon className="w-10 h-10 text-[#ffb000]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





    </div>
  );
};

// Données pour les valeurs
const values = [
  {
    icon: Shield,
    title: "Sécurité",
    description: "Nous vérifions chaque profil et garantissons des transactions sécurisées"
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Nous construisons un réseau de confiance entre professionnels"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Nous repoussons les limites grâce à la technologie"
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Nous sommes animés par l'amour du secteur logistique"
  }
];

// Données pour les statistiques de vision
const visionStats = [
  { value: "95%", label: "Taux de satisfaction" },
  { value: "24h", label: "Mise en relation moyenne" },
  { value: "12", label: "Régions couvertes" },
  { value: "100%", label: "Profils vérifiés" }
];

