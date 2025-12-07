import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiUser,
  FiTruck,
  FiMapPin,
  FiDollarSign,
  FiShield,
  FiCheckCircle,
  FiCalendar
} from "react-icons/fi";
import {
  FaWarehouse,
  FaHandshake,
  FaCertificate,
  FaUserCheck,
  FaTruckLoading
} from "react-icons/fa";
import { MdOutlineLocalShipping, MdSpeed } from "react-icons/md";

export default function LoginDriver() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/login-driver", { email, password });

      // Store token and driver data
      if (rememberMe) {
        localStorage.setItem("driverToken", res.data.token);
        localStorage.setItem("driver", JSON.stringify(res.data.driver));
      } else {
        sessionStorage.setItem("driverToken", res.data.token);
        sessionStorage.setItem("driver", JSON.stringify(res.data.driver));
      }

      // Success notification
      setMsg("Connexion réussie ! Redirection en cours...");

      // Show success animation
      setTimeout(() => {
        navigate("/driver/dashboard");
      }, 1500);

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Erreur de connexion";
      setMsg(errorMsg);

      // Shake animation on error
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Illustration & Info */}
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
                  <FaTruckLoading className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Lift<span className="text-black/70">Grid</span>
                </span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Bienvenue <br />
                <span className="text-black">cariste</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Accédez à des missions adaptées à vos compétences et développez votre carrière
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                { icon: <FiDollarSign />, text: "Rémunération compétitive" },
                { icon: <FiCalendar />, text: "Flexibilité totale des horaires" },
                { icon: <FaCertificate />, text: "Certifications valorisées" },
                { icon: <FaUserCheck />, text: "Entreprises sérieuses vérifiées" },
                { icon: <MdSpeed />, text: "Mise en relation rapide" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">{benefit.icon}</span>
                  </div>
                  <span className="text-white font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Right Side - Login Form */}
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
                <FiUser className="w-8 h-8 text-[#ffb000]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Connexion Cariste
              </h2>
              <p className="text-gray-600">
                Accédez à votre espace personnel
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <Link
                    to="/driver/forgot-password"
                    className="text-sm text-[#ffb000] hover:text-yellow-600 font-medium"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-driver"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#ffb000] focus:ring-[#ffb000] border-gray-300 rounded"
                />
                <label htmlFor="remember-driver" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
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
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">Ou continuer avec</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Registration Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Vous n'avez pas encore de compte ?{" "}
                <Link
                  to="/driver/register"
                  className="text-[#ffb000] hover:text-yellow-600 font-semibold inline-flex items-center gap-1 group"
                >
                  Devenir cariste
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>

            {/* Security Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <FiShield className="w-4 h-4" />
                <span>Connexion sécurisée par chiffrement SSL</span>
              </div>
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