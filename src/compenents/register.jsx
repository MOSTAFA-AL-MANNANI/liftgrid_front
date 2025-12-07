import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiBriefcase,
  FiMapPin,
  FiFileText,
  FiAward,
  FiArrowRight,
  FiUpload,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiShield,
  FiTruck
} from "react-icons/fi";
import { 
  FaUserTie, 
  FaCertificate, 
  FaRegFilePdf,
  FaRegCheckCircle,
  FaRegTimesCircle
} from "react-icons/fa";
import { MdOutlineWorkHistory, MdLocationOn } from "react-icons/md";

export default function RegisterDriver() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    city: "",
    experienceYears: "",
  });

  const [cv, setCv] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Animation variants
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

  // Check password strength
  useEffect(() => {
    const checks = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(score);
  }, [formData.password]);

  const handleFile = (setter, maxSizeMB = 5) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setMsg(`Le fichier ne doit pas dépasser ${maxSizeMB}MB`);
      return;
    }

    // Check file type
    if (file.type !== "application/pdf") {
      setMsg("Veuillez télécharger un fichier PDF");
      return;
    }

    setter(file);
    setMsg("");
  };

  const validateStep = (stepNumber) => {
    const errors = {};

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) errors.fullName = "Le nom est requis";
      if (!formData.phone.trim()) errors.phone = "Le téléphone est requis";
      if (!formData.email.trim()) {
        errors.email = "L'email est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Email invalide";
      }
    }

    if (stepNumber === 2) {
      if (!formData.password) {
        errors.password = "Le mot de passe est requis";
      } else if (formData.password.length < 8) {
        errors.password = "Minimum 8 caractères";
      } else if (passwordStrength < 3) {
        errors.password = "Mot de passe trop faible";
      }
      if (!formData.city.trim()) errors.city = "La ville est requise";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setMsg("");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;
    if (!cv) {
      setMsg("Le CV est requis");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (cv) data.append("cv", cv);
    if (certifications) data.append("certifications", certifications);

    setSubmitting(true);

    try {
      await api.post("/create-driver", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success animation
      setMsg("Compte créé avec succès ! Redirection...");
      
      setTimeout(() => {
        navigate("/driver/login");
      }, 2000);

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        city: "",
        experienceYears: "",
      });
      setCv(null);
      setCertifications(null);

    } catch (err) {
      const errorMsg = err?.response?.data?.message || err.message || "Erreur lors de la création du compte";
      setMsg(errorMsg);
      
      // Error animation
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    } finally {
      setSubmitting(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-orange-500";
    if (passwordStrength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Très faible";
    if (passwordStrength <= 2) return "Faible";
    if (passwordStrength <= 3) return "Moyen";
    if (passwordStrength <= 4) return "Fort";
    return "Très fort";
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 ${
                    formErrors.fullName ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="John Doe"
                  required
                />
              </div>
              {formErrors.fullName && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaRegTimesCircle className="w-3 h-3" /> {formErrors.fullName}
                </p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 ${
                    formErrors.phone ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="+33 1 23 45 67 89"
                  required
                />
              </div>
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaRegTimesCircle className="w-3 h-3" /> {formErrors.phone}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 ${
                    formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="cariste@exemple.com"
                  required
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaRegTimesCircle className="w-3 h-3" /> {formErrors.email}
                </p>
              )}
            </motion.div>

            {/* Experience */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Années d'expérience
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineWorkHistory className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 bg-gray-50"
                  placeholder="5"
                />
              </div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 ${
                    formErrors.password ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
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

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-600">
                      Force du mot de passe
                    </span>
                    <span className={`text-xs font-bold ${
                      passwordStrength === 0 ? "text-gray-500" :
                      passwordStrength <= 2 ? "text-red-500" :
                      passwordStrength <= 3 ? "text-orange-500" :
                      passwordStrength <= 4 ? "text-yellow-500" : "text-green-500"
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaRegTimesCircle className="w-3 h-3" /> {formErrors.password}
                </p>
              )}
            </motion.div>

            {/* City */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLocationOn className="h-5 w-5 text-gray-400 group-focus-within:text-[#ffb000]" />
                </div>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#ffb000] focus:border-transparent transition-all duration-300 ${
                    formErrors.city ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                  }`}
                  placeholder="Paris"
                  required
                />
              </div>
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <FaRegTimesCircle className="w-3 h-3" /> {formErrors.city}
                </p>
              )}
            </motion.div>

            {/* CV Upload */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Curriculum Vitae (PDF) *
              </label>
              <div className="relative group">
                <input
                  id="cvInput"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFile(setCv)}
                />
                <label
                  htmlFor="cvInput"
                  className={`flex items-center justify-between p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-[#ffb000] hover:bg-orange-50 ${
                    cv ? "border-green-500 bg-green-50" : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      cv ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      <FiFileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {cv ? cv.name : "Télécharger votre CV"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {cv ? "Fichier prêt" : "Format PDF, max 5MB"}
                      </div>
                    </div>
                  </div>
                  <FiUpload className={`w-5 h-5 ${
                    cv ? "text-green-500" : "text-gray-400"
                  }`} />
                </label>
              </div>
            </motion.div>

            {/* Certifications Upload */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications (PDF) - Optionnel
              </label>
              <div className="relative group">
                <input
                  id="certInput"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFile(setCertifications)}
                />
                <label
                  htmlFor="certInput"
                  className={`flex items-center justify-between p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-[#ffb000] hover:bg-orange-50 ${
                    certifications ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      certifications ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}>
                      <FiAward className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">
                        {certifications ? certifications.name : "Télécharger vos certifications"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {certifications ? "Fichier prêt" : "Format PDF, max 5MB"}
                      </div>
                    </div>
                  </div>
                  <FiUpload className={`w-5 h-5 ${
                    certifications ? "text-blue-500" : "text-gray-400"
                  }`} />
                </label>
              </div>
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Info */}
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
                  <FiTruck className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Lift<span className="text-black/70">Grid</span>
                </span>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Devenir <br />
                <span className="text-black">cariste</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Rejoignez notre communauté de caristes qualifiés et accédez aux meilleures missions
              </p>
            </div>

            {/* Benefits */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {[
                { icon: <FiBriefcase />, text: "Accès à des missions premium" },
                { icon: <FiShield />, text: "Plateforme 100% sécurisée" },
                { icon: <FaCertificate />, text: "Valorisez vos certifications" },
                { icon: <FiMapPin />, text: "Travaillez près de chez vous" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">{benefit.icon}</span>
                  </div>
                  <span className="text-white font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Steps */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber ? "bg-white text-[#ffb000]" : "bg-white/20 text-white/60"
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`text-sm font-medium ${
                      step >= stepNumber ? "text-white" : "text-white/60"
                    }`}>
                      {stepNumber === 1 ? "Informations" : "Documents"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
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
                <FaUserTie className="w-8 h-8 text-[#ffb000]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Inscription Cariste
              </h2>
              <p className="text-gray-600">
                Étape {step} sur 2
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
              {renderStep()}

              {/* Message Display */}
              <AnimatePresence>
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                      msg.includes("Erreur") || msg.includes("trop faible")
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : msg.includes("succès")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {msg.includes("Erreur") || msg.includes("trop faible") ? (
                        <FaRegTimesCircle className="text-red-500" />
                      ) : msg.includes("succès") ? (
                        <FaRegCheckCircle className="text-green-500" />
                      ) : (
                        <FiCheck className="text-blue-500" />
                      )}
                      {msg}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-4">
                {step > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    Retour
                  </motion.button>
                )}
                
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: step === 2 ? 1.02 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 bg-gradient-to-r from-[#ffb000] to-yellow-500 text-black font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-[#ffb000]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                    step === 1 ? "ml-auto" : ""
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Inscription...
                    </>
                  ) : step === 1 ? (
                    <>
                      <span>Continuer</span>
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>Créer mon compte</span>
                      <FiCheck className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/driver/login"
                  className="text-[#ffb000] hover:text-yellow-600 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <FiShield className="w-4 h-4" />
                <span>Vos données sont protégées et chiffrées</span>
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