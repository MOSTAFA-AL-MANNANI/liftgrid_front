import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
  FaArrowUp,
  FaShieldAlt,
  FaAward,
  FaHeadset,
  FaTruck,
  FaWarehouse
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { MdOutlineEmail, MdLocalShipping } from "react-icons/md";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer sections
  const footerLinks = {
    company: [
      { name: "À propos", link: "/about" },
      { name: "Notre équipe", link: "/team" },
      { name: "Carrières", link: "/careers", badge: "Nous recrutons" },
      { name: "Presse", link: "/press" },
      { name: "Blog", link: "/blog" }
    ],
    services: [
      { name: "Pour les caristes", link: "/services/drivers" },
      { name: "Pour les entreprises", link: "/services/companies" },
      { name: "Formations CACES", link: "/training" },
      { name: "Recrutement", link: "/recruitment" },
      { name: "Consulting", link: "/consulting" }
    ],
    resources: [
      { name: "Centre d'aide", link: "/help" },
      { name: "FAQ", link: "/faq" },
      { name: "Tutoriels", link: "/tutorials" },
      { name: "Documentation", link: "/docs" },
      { name: "Téléchargements", link: "/downloads" }
    ],
    legal: [
      { name: "Conditions d'utilisation", link: "/terms" },
      { name: "Politique de confidentialité", link: "/privacy" },
      { name: "Cookies", link: "/cookies" },
      { name: "Mentions légales", link: "/legal" },
      { name: "Accessibilité", link: "/accessibility" }
    ]
  };

  const contactInfo = [
    {
      icon: <FiMapPin />,
      text: "Maroc, Casablanca",
      link: "https://maps.google.com"
    },
    {
      icon: <FiPhone />,
      text: "+212 6 17 12 5803",
      link: "tel:+212617125803"
    },
    {
      icon: <FiMail />,
      text: "almannanimostafa@gmail.com",
      link: "mailto:almannanimostafa@gmail.com"
    },

  ];

  const socialMedia = [
    { icon: <FaFacebookF />, name: "Facebook", link: "#", color: "bg-blue-600" },
    { icon: <FaTwitter />, name: "Twitter", link: "#", color: "bg-sky-500" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", link: "#", color: "bg-blue-700" },
    { icon: <FaInstagram />, name: "Instagram", link: "#", color: "bg-pink-600" },
    { icon: <FaYoutube />, name: "YouTube", link: "#", color: "bg-red-600" },
    { icon: <FaWhatsapp />, name: "WhatsApp", link: "#", color: "bg-green-500" }
  ];

  const certifications = [
    { icon: <FaShieldAlt />, text: "Sécurité certifiée" },
    { icon: <FaAward />, text: "Service qualité ISO 9001" },
    { icon: <FaHeadset />, text: "Support 24/7" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffb000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h4zm0-6V16h-2v12h2zm0 18v-8h-2v8h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Top wave divider */}
      <div className="relative">
        <svg 
          className="w-full h-20 transform -translate-y-1" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-gray-900"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-gray-900"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,93.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-gray-900"
          ></path>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link to="/" className="inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0  rounded-xl blur-lg opacity-50"></div>
                      <div className="relative w-14 h-14  rounded-xl flex items-center justify-center shadow-2xl">
                        <img src="logo.png" alt="" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">
                        Lift<span className="text-[#ffb000]">Grid</span>
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        La plateforme de référence pour la logistique
                      </p>
                    </div>
                  </motion.div>
                </Link>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  LiftGrid connecte les entreprises aux meilleurs caristes certifiés.
                  Optimisez vos opérations logistiques avec notre plateforme innovante
                  et sécurisée.
                </p>

                {/* Newsletter Subscription */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Restez informé
                  </h3>

                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl"
                  >
                    <span className="text-[#ffb000]">{cert.icon}</span>
                    <span className="text-sm text-gray-300">{cert.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">
                Entreprise
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.link}
                      className="flex items-center gap-2 text-gray-400 hover:text-[#ffb000] transition-colors group"
                    >
                      <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-[#ffb000] transition-all" />
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-[#ffb000] to-yellow-500 text-black rounded-full font-bold">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.link}
                      className="flex items-center gap-2 text-gray-400 hover:text-[#ffb000] transition-colors group"
                    >
                      <MdLocalShipping className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-[#ffb000] transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-800">
                Contact
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ffb000]/20 to-transparent rounded-lg flex items-center justify-center mt-1">
                      <span className="text-[#ffb000] text-lg">{info.icon}</span>
                    </div>
                    <div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-[#ffb000] transition-colors"
                        >
                          {info.text}
                        </a>
                      ) : (
                        <span className="text-gray-300">{info.text}</span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`${social.color} w-10 h-10 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all`}
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm">
                © 2025 <span className="text-[#ffb000] font-semibold">LiftGrid</span>. 
                Tous droits réservés.
              </div>



              {/* Payment Methods */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Paiements sécurisés :</span>
                <div className="flex gap-2">
                  {["Visa", "Mastercard", "PayPal", "Stripe"].map((method, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-lg text-xs text-gray-300"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, backgroundColor: "#ffb000" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#ffb000] to-yellow-500 rounded-full flex items-center justify-center shadow-2xl z-40"
        >
          <FaArrowUp className="w-5 h-5 text-black" />
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-[#ffb000]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-[#ffb000]/5 to-transparent rounded-full blur-3xl"></div>
    </footer>
  );
};