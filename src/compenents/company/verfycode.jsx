import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiKey,
  FiCheck,
  FiArrowRight,
  FiRefreshCw,
  FiShield,
  FiMail,
  FiLock,
  FiClock,
  FiArrowLeft
} from "react-icons/fi";
import { MdOutlineVerified, MdSecurity, MdBusinessCenter } from "react-icons/md";
import { FaRegEnvelope, FaUserShield, FaRegBuilding } from "react-icons/fa";

export default function VerifyCodeCompany() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Timer pour renvoyer le code
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Auto-focus sur le premier input
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus sur le prochain input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit si tous les champs sont remplis
    if (newCode.every(digit => digit !== "") && index === 5) {
      setTimeout(() => {
        handleSubmit();
      }, 300);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code];
    pasteData.split("").forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);
    
    // Focus sur le dernier input rempli
    const lastFilledIndex = Math.min(pasteData.length, 5);
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const fullCode = code.join("");
    
    if (fullCode.length < 6) {
      const text = "Veuillez entrer les 6 chiffres du code.";
      setMsg(text);
      return;
    }

    setLoading(true);
    setMsg("");
    const email = localStorage.getItem("resetEmail");

    try {
      await api.post("/verify-reset-code/company", { email, code: fullCode });
      localStorage.setItem("resetCode", fullCode);
      
      // Animation de succès
      setMsg("Code validé ! Redirection en cours...");
      
      setTimeout(() => {
        navigate("/company/reset-password");
      }, 1500);

    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur de vérification";
      setMsg(errorMsg);
      
      // Animation d'erreur
      const form = e?.target || document.querySelector("form");
      if (form) {
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setLoading(true);
    const email = localStorage.getItem("resetEmail");
    
    try {
      await api.post("/resend-reset-code/company", { email });
      setTimer(300);
      setCanResend(false);
      setMsg("Nouveau code envoyé !");
      
      // Réinitialiser les inputs
      setCode(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (err) {
      setMsg("Erreur lors de l'envoi du code");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getMaskedEmail = () => {
    const email = localStorage.getItem("resetEmail") || "";
    const [username, domain] = email.split("@");
    if (!username || !domain) return email;
    
    const maskedUsername = username.length > 3 
      ? username.slice(0, 3) + "*".repeat(username.length - 3)
      : username;
    
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Security Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Header */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FaRegBuilding className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Lift<span className="text-white/70">Grid</span>
                </span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Vérification <br />
                <span className="text-white/90">Entreprise</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Code de sécurité envoyé à l'adresse email de votre entreprise
              </p>
            </div>

            {/* Security Info */}
            <div className="space-y-4">
              {[
                { icon: <FiShield />, text: "Sécurité entreprise niveau élevé" },
                { icon: <FiMail />, text: `Code envoyé à ${getMaskedEmail()}` },
                { icon: <MdSecurity />, text: "Protection des données sensibles" },
                { icon: <FiLock />, text: "Chiffrement end-to-end" }
              ].map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">{info.icon}</span>
                  </div>
                  <span className="text-white font-medium">{info.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Timer & Stats */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FiClock className="w-6 h-6 text-white" />
                <div className="text-2xl font-bold text-white font-mono">
                  {formatTime(timer)}
                </div>
              </div>
              <div className="text-white/80 text-center text-sm">
                Temps restant avant expiration
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">AES-256</div>
                  <div className="text-white/80 text-xs">Chiffrement</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">SSL/TLS</div>
                  <div className="text-white/80 text-xs">Protocole</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Verification Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MdBusinessCenter className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Vérifiez votre identité
              </h2>
              <p className="text-gray-600 mb-1">
                Entrez le code à 6 chiffres envoyé par email
              </p>
              <p className="text-sm text-gray-500">
                Sécurité entreprise - Espace administrateur
              </p>
            </div>

            {/* Code Inputs */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center gap-2 md:gap-3">
                {code.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    whileFocus={{ scale: 1.1 }}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 outline-none bg-gray-50"
                  />
                ))}
              </div>

              {/* Message Display */}
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm font-medium text-center ${
                    msg.includes("Erreur")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : msg.includes("validé")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {msg.includes("Erreur") ? (
                      <span className="text-red-500">✕</span>
                    ) : msg.includes("validé") ? (
                      <FiCheck className="text-green-500" />
                    ) : (
                      <FiKey className="text-blue-500" />
                    )}
                    {msg}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || code.some(digit => digit === "")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Vérification...
                  </>
                ) : (
                  <>
                    <span>Vérifier le code</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Resend Code */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend || loading}
                  className={`inline-flex items-center gap-2 text-sm font-medium ${
                    canResend
                      ? "text-blue-600 hover:text-blue-800"
                      : "text-gray-400 cursor-not-allowed"
                  } transition-colors`}
                >
                  <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  {canResend ? "Renvoyer le code" : `Renvoyer dans ${formatTime(timer)}`}
                </button>
              </div>
            </form>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 text-center">
                  Vous ne recevez pas le code ?
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    <FaRegEnvelope className="w-4 h-4" />
                    Vérifier les spams
                  </button>
                  <span className="hidden sm:inline text-gray-400">•</span>
                  <Link
                    to="/company/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiKey className="w-4 h-4" />
                    Modifier l'email
                  </Link>
                </div>
              </div>
            </div>

            {/* Back to Forgot Password */}
            <div className="mt-6 text-center">
              <Link
                to="/company/forgot-password"
                className="text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-2 text-sm"
              >
                <FiArrowLeft className="w-4 h-4" />
                Retour à la réinitialisation
              </Link>
            </div>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Link
                  to="/company/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <FaUserShield className="w-3 h-3" />
              <span>Vérification de sécurité entreprise</span>
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
        
        /* Style pour les inputs de code */
        input[type="text"] {
          caret-color: transparent;
        }
        
        input[type="text"]:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}