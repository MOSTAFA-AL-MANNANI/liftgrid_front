import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiUpload,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUserPlus
} from "react-icons/fi";
import { 
  FaRegBuilding, 
  FaRegIdCard, 
  FaRegFileAlt,
  FaRegImage,
  FaRegCheckCircle,
  FaRegTimesCircle
} from "react-icons/fa";
import { MdBusinessCenter, MdLocationCity } from "react-icons/md";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    rcNumber: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    description: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle logo upload + preview
  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setMessage("Format d'image non supporté (JPEG, PNG, GIF, WebP uniquement)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage("L'image ne doit pas dépasser 2MB");
      return;
    }

    setLogo(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;

    if (!form.name.trim()) errors.name = "Le nom de la société est requis";
    if (!form.rcNumber.trim()) errors.rcNumber = "Le numéro RC est requis";
    if (!form.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Email invalide";
    }
    if (!form.password) {
      errors.password = "Le mot de passe est requis";
    } else if (form.password.length < 8) {
      errors.password = "Minimum 8 caractères";
    }
    if (!form.phone.trim()) {
      errors.phone = "Le téléphone est requis";
    } else if (!phoneRegex.test(form.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }
    if (!form.city.trim()) errors.city = "La ville est requise";
    if (!logo) errors.logo = "Le logo est requis";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      setMessage("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (logo) data.append("logo", logo);

    try {
      const res = await api.post("/companies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success
      setMessage("Entreprise créée avec succès ! Redirection...");
      
      setTimeout(() => {
        navigate("/company/dashboard");
      }, 2000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erreur serveur";
      setMessage("Erreur : " + errorMsg);
      
      // Shake animation on error
      const formElement = e.target;
      formElement.classList.add("shake");
      setTimeout(() => formElement.classList.remove("shake"), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side - Info & Preview */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 md:p-12 relative overflow-hidden"
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MdBusinessCenter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Nouvelle Entreprise
                  </h2>
                  <p className="text-white/80 text-sm">
                    Rejoignez notre réseau professionnel
                  </p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Inscrivez votre <br />
                <span className="text-white/90">entreprise</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Accédez aux meilleurs caristes certifiés et optimisez votre logistique
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
                { icon: <FiUserPlus />, text: "Recrutez des caristes qualifiés" },
                { icon: <FiShield />, text: "Plateforme sécurisée pour entreprises" },
                { icon: <FiFileText />, text: "Gestion simplifiée des contrats" },
                { icon: <MdBusinessCenter />, text: "Tableau de bord professionnel" }
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

            {/* Logo Preview */}
            <div className="mt-8">
              <div className="text-white font-medium mb-4">
                Aperçu du logo
              </div>
              <div className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <FaRegImage className="w-8 h-8 text-white/50 mb-2" />
                    <span className="text-white/50 text-xs">Logo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 bg-white p-8 md:p-12 overflow-y-auto max-h-screen"
        >
          <div className="max-w-md mx-auto w-full">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-indigo-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MdBusinessCenter className="w-8 h-8 text-blue-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Formulaire Entreprise
              </h2>
              <p className="text-gray-600">
                Remplissez les informations de votre entreprise
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Company Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la société *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRegBuilding className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                    </div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
                        formErrors.name ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                      }`}
                      placeholder="Ex: Transport Express"
                      required
                    />
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <FaRegTimesCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </motion.div>

                {/* RC Number */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro RC *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRegIdCard className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                    </div>
                    <input
                      name="rcNumber"
                      value={form.rcNumber}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
                        formErrors.rcNumber ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                      }`}
                      placeholder="123456789"
                      required
                    />
                  </div>
                  {formErrors.rcNumber && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <FaRegTimesCircle className="w-3 h-3" /> {formErrors.rcNumber}
                    </p>
                  )}
                </motion.div>

                {/* Email & Password Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
                          formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"
                        }`}
                        placeholder="contact@entreprise.com"
                        required
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FaRegTimesCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                      </div>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
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
                    {formErrors.password && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FaRegTimesCircle className="w-3 h-3" /> {formErrors.password}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Phone & City Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                      </div>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
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

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdLocationCity className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                      </div>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 ${
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
                </div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="relative group">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaRegFileAlt className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600" />
                    </div>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 bg-gray-50"
                      placeholder="Décrivez votre entreprise..."
                      rows="3"
                    />
                  </div>
                </motion.div>

                {/* Logo Upload */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de l'entreprise *
                  </label>
                  <div className="relative">
                    <input
                      id="logoInput"
                      type="file"
                      accept="image/*"
                      onChange={handleLogo}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="logoInput"
                      className={`flex items-center justify-between p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 ${
                        logo ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      } ${formErrors.logo ? "border-red-300 bg-red-50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          logo ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                        }`}>
                          <FiUpload className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {logo ? logo.name : "Télécharger le logo"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {logo ? "Fichier prêt" : "JPG, PNG, GIF, WebP - max 2MB"}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                  {formErrors.logo && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <FaRegTimesCircle className="w-3 h-3" /> {formErrors.logo}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    message.includes("Erreur")
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : message.includes("succès")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {message.includes("Erreur") ? (
                      <FaRegTimesCircle className="text-red-500" />
                    ) : message.includes("succès") ? (
                      <FaRegCheckCircle className="text-green-500" />
                    ) : (
                      <FiCheck className="text-blue-500" />
                    )}
                    {message}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <span>Créer l'entreprise</span>
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Security Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <FiShield className="w-4 h-4" />
                <span>Vos données sont protégées et conformes au RGPD</span>
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