import React from "react";
import { motion } from "framer-motion";
import { Building2, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* --- Card Entreprise --- */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/company/login")}
          className="cursor-pointer bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 
                     hover:border-[#ffb000] transition-all duration-300 text-center"
        >
          <div className="flex justify-center mb-4">
            <Building2 className="w-16 h-16 text-[#ffb000]" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Espace Entreprise
          </h2>

          <p className="text-gray-300">
            Accédez à votre espace entreprise pour publier des offres d’emploi.
          </p>
        </motion.div>

        {/* --- Card Chauffeur / Cariste --- */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/driver/login")}
          className="cursor-pointer bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 
                     hover:border-[#ffb000] transition-all duration-300 text-center"
        >
          <div className="flex justify-center mb-4">
            <Truck className="w-16 h-16 text-[#ffb000]" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Chauffeurs & Caristes
          </h2>

          <p className="text-gray-300">
            Trouvez des offres pour chauffeurs et conducteurs d’engins.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
