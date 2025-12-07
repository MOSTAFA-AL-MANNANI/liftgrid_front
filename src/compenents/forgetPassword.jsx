import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiSend,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiLock,
  FiHelpCircle,
  FiSmartphone,
  FiCheckCircle
} from "react-icons/fi";
import { FaRegEnvelope, FaUserShield, FaKey } from "react-icons/fa";
import { MdOutlinePassword, MdSecurity } from "react-icons/md";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email) {
      setMsg("Veuillez entrer votre adresse email");
      return;
    }

    if (!validateEmail(email)) {
      setMsg("Veuillez entrer une adresse email valide");
      return;
    }

    setLoading(true);

    try {
      await api.post("/send-reset-code", { email });
      localStorage.setItem("resetEmail", email);
      setMsg("Code envoyé avec succès !");
      setStep(2);
      
      // Animation de succès
      setTimeout(() => {
        navigate("/driver/verify-reset");
      }, 2000);

    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur lors de l'envoi du code";
      setMsg(errorMsg);
      
      // Animation d'erreur
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    } finally {
      setLoading(false);
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Security Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 bg-gradient-to-br from-[#ffb000] via-yellow-500 to-orange-500 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FaUserShield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Lift<span className="text-black/70">Grid</span>
                </span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Réinitialisation <br />
                <span className="text-black">sécurisée</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Protégez votre compte en réinitialisant votre mot de passe en toute sécurité
              </p>
            </div>

            {/* Security Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {[
                {
                  step: 1,
                  icon: <FiMail />,
                  title: "Entrez votre email",
                  description: "Nous enverrons un code de vérification",
                  active: step >= 1
                },
                {
                  step: 2,
                  icon: <MdSecurity />,
                  title: "Vérifiez le code",
                  description: "Saisissez le code reçu par email",
                  active: step >= 2
                },
                {
                  step: 3,
                  icon: <FiLock />,
                  title: "Nouveau mot de passe",
                  description: "Créez un nouveau mot de passe sécurisé",
                  active: step >= 3
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    item.active
                      ? "bg-white text-[#ffb000]"
                      : "bg-white/20 text-white/60"
                  }`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <div className={`font-semibold transition-colors duration-300 ${
                      item.active ? "text-white" : "text-white/60"
                    }`}>
                      {item.title}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      item.active ? "text-white/90" : "text-white/40"
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Security Tips */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3">
                <FiShield className="w-5 h-5 text-white" />
                <span className="text-white/90 text-sm">
                  Votre sécurité est notre priorité. Toutes les données sont chiffrées.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ffb000]/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaKey className="w-8 h-8 text-[#ffb000]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Mot de passe oublié ?
              </h2>
              <p className="text-gray-600">
                Pas de problème. Entrez votre email pour réinitialiser votre mot de passe.
              </p>
            </div>

            {/* Forgot Password Form */}
            <form onSubmit={sendCode} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="cariste@exemple.com"
                    required
                  />
                </div>
              </div>

              {/* Message Display */}
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    msg.includes("Erreur")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {msg.includes("Erreur") ? (
                      <span className="text-red-500">✕</span>
                    ) : (
                      <FiCheckCircle className="text-green-500" />
                    )}
                    {msg}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#ffb000] to-yellow-500 text-black font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-[#ffb000]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <span>Envoyer le code de réinitialisation</span>
                    <FiSend className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <FiHelpCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">
                    Comment ça fonctionne ?
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Entrez l'email associé à votre compte</li>
                    <li>• Recevez un code de vérification par email</li>
                    <li>• Saisissez le code sur la page suivante</li>
                    <li>• Créez votre nouveau mot de passe</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Vous ne recevez pas l'email ?
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    <button className="text-sm text-gray-600 hover:text-[#ffb000] transition-colors flex items-center gap-2">
                      <FaRegEnvelope className="w-4 h-4" />
                      Vérifier les spams
                    </button>
                    <span className="text-gray-400">•</span>
                    <button className="text-sm text-gray-600 hover:text-[#ffb000] transition-colors flex items-center gap-2">
                      <FiSmartphone className="w-4 h-4" />
                      Vérifier l'email mobile
                    </button>
                  </div>
                </div>
                
                {/* Direct Verification Link */}
                <div className="text-center">
                  <Link
                    to="/driver/verify-reset"
                    className="inline-flex items-center gap-2 text-sm text-[#ffb000] hover:text-yellow-600 font-medium"
                  >
                    <MdOutlinePassword className="w-4 h-4" />
                    J'ai déjà reçu le code
                  </Link>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link
                to="/driver/login"
                className="text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-2"
              >
                <FiArrowLeft className="w-4 h-4" />
                Retour à la connexion
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}