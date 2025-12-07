import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiArrowRight,
  FiShield,
  FiAlertCircle,
  FiKey,
  FiUserCheck
} from "react-icons/fi";
import { FaUserShield, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { MdPassword, MdSecurity } from "react-icons/md";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const navigate = useNavigate();

  // Vérifier les critères du mot de passe
  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setRequirements(checks);
    
    // Calculer la force du mot de passe
    const score = Object.values(checks).filter(Boolean).length;
    setStrength(score);
  }, [password]);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-200";
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-orange-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength === 0) return "Très faible";
    if (strength <= 2) return "Faible";
    if (strength <= 3) return "Moyen";
    if (strength <= 4) return "Fort";
    return "Très fort";
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas";
    }
    if (strength < 3) {
      return "Veuillez renforcer votre mot de passe";
    }
    return null;
  };

  const reset = async (e) => {
    e.preventDefault();
    setMsg("");

    const validationError = validatePassword();
    if (validationError) {
      setMsg(validationError);
      
      // Animation d'erreur
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
      return;
    }

    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("resetCode");

    if (!email || !code) {
      setMsg("Session expirée. Veuillez recommencer le processus.");
      setTimeout(() => navigate("/driver/forgot-password"), 2000);
      return;
    }

    setLoading(true);

    try {
      await api.post("/reset-password", {
        email,
        code,
        newPassword: password,
      });

      // Succès
      setMsg("Mot de passe modifié avec succès ! Redirection...");
      
      // Nettoyer le localStorage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");
      
      // Rediriger après délai
      setTimeout(() => {
        navigate("/driver/login");
      }, 2000);

    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur lors de la réinitialisation";
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Security Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-8 md:p-12 relative overflow-hidden"
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
                Nouveau mot de passe <br />
                <span className="text-black">sécurisé</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Créez un mot de passe fort pour protéger votre compte
              </p>
            </div>

            {/* Security Tips */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {[
                { icon: <FiShield />, text: "Chiffrement AES-256" },
                { icon: <MdSecurity />, text: "Connexion sécurisée SSL" },
                { icon: <FiUserCheck />, text: "Authentification à deux facteurs" },
                { icon: <FiAlertCircle />, text: "Alerte de nouvelle connexion" }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">{tip.icon}</span>
                  </div>
                  <span className="text-white font-medium">{tip.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Password Strength Info */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <h3 className="text-white font-bold mb-3">Conseils de sécurité</h3>
              <ul className="text-white/90 text-sm space-y-2">
                <li>• Utilisez au moins 12 caractères</li>
                <li>• Mélangez lettres, chiffres et symboles</li>
                <li>• Évitez les informations personnelles</li>
                <li>• Utilisez un mot de passe unique</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Reset Password Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MdPassword className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Nouveau mot de passe
              </h2>
              <p className="text-gray-600">
                Créez un mot de passe sécurisé pour votre compte
              </p>
            </div>

            {/* Reset Password Form */}
            <form onSubmit={reset} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Votre nouveau mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      Force du mot de passe
                    </span>
                    <span className={`text-xs font-bold ${
                      strength === 0 ? "text-gray-500" :
                      strength <= 2 ? "text-red-500" :
                      strength <= 3 ? "text-orange-500" :
                      strength <= 4 ? "text-yellow-500" : "text-green-500"
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="h-5 w-5 text-gray-400 group-focus-within:text-green-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <FaRegTimesCircle className="w-4 h-4" />
                    Les mots de passe ne correspondent pas
                  </p>
                )}
                {confirmPassword && password === confirmPassword && (
                  <p className="mt-2 text-sm text-green-500 flex items-center gap-1">
                    <FaRegCheckCircle className="w-4 h-4" />
                    Les mots de passe correspondent
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Votre mot de passe doit contenir :
                </h4>
                <ul className="space-y-1">
                  {Object.entries(requirements).map(([key, met]) => (
                    <li key={key} className="flex items-center gap-2 text-sm">
                      {met ? (
                        <FiCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="w-4 h-4 text-gray-400">•</span>
                      )}
                      <span className={met ? "text-gray-600" : "text-gray-400"}>
                        {key === "length" && "Au moins 8 caractères"}
                        {key === "uppercase" && "Une lettre majuscule"}
                        {key === "lowercase" && "Une lettre minuscule"}
                        {key === "number" && "Un chiffre"}
                        {key === "special" && "Un caractère spécial"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Message Display */}
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    msg.includes("Erreur") || msg.includes("expirée")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {msg.includes("Erreur") || msg.includes("expirée") ? (
                      <FaRegTimesCircle className="text-red-500" />
                    ) : (
                      <FaRegCheckCircle className="text-green-500" />
                    )}
                    {msg}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || strength < 3 || password !== confirmPassword}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mise à jour en cours...
                  </>
                ) : (
                  <>
                    <span>Changer le mot de passe</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <FiShield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">
                    Sécurité renforcée
                  </h4>
                  <p className="text-xs text-blue-700">
                    Après cette réinitialisation, toutes les sessions actives seront fermées pour protéger votre compte.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link
                to="/driver/login"
                className="text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-2"
              >
                <FiArrowRight className="w-4 h-4 rotate-180" />
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