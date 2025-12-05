import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faInfoCircle, 
  faBriefcase, 
  faEnvelope,
  faUser,
  faBuilding,
  faBars,
  faTimes,
  faArrowRight,
  faWarehouse,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("/");
  const location = useLocation();

  // Navigation items
  const navItems = [
    { 
      name: "Accueil", 
      link: "/", 
      icon: faHome,
      desc: "Page d'accueil"
    },
    { 
      name: "À propos", 
      link: "/about", 
      icon: faInfoCircle,
      desc: "Notre histoire"
    },
    { 
      name: "Services", 
      link: "/services", 
      icon: faBriefcase,
      desc: "Nos solutions"
    },
    { 
      name: "Contact", 
      link: "/contact", 
      icon: faEnvelope,
      desc: "Nous contacter"
    }
  ];

  const authItems = [
    {
      name: "Cariste",
      link: "/login/driver",
      icon: faUser,
      color: "from-[#ffb000] to-yellow-500"
    },
    {
      name: "Entreprise",
      link: "/login/company",
      icon: faBuilding,
      color: "from-blue-500 to-blue-600"
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active nav based on location
  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300  ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-2xl py-3 border-b border-gray-200" 
            : "bg-dark py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0  opacity-50 rounded-full"></div>
                  <div className="relative w-12 h-12  rounded-xl flex items-center justify-center shadow-lg">
                    <img 
                      src="/logo.png" 
                      className="w-20 text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className={`font-bold text-2xl ${
                    scrolled ? "text-gray-900" : "text-dark"
                  }`}>
                    Lift<span className="text-[#ffb000]">Grid</span>
                  </h1>
                  <span className="text-xs text-gray-500 font-medium hidden sm:block">
                    Plateforme Caristes & Entreprises
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Main Navigation */}
              <ul className="flex items-center gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Link
                      to={item.link}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                        activeNav === item.link
                          ? "text-white bg-gradient-to-r from-[#ffb000] to-yellow-500 shadow-lg shadow-[#ffb000]/30"
                          : scrolled
                            ? "text-gray-700 hover:text-[#ffb000] hover:bg-gray-100"
                            : "text-dark hover:text-[#ffb000] hover:bg-white/10"
                      }`}
                      onMouseEnter={() => setActiveNav(item.link)}
                    >
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="w-4 h-4"
                      />
                      <span>{item.name}</span>
                      {activeNav === item.link && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-gradient-to-r from-[#ffb000] to-yellow-500 rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Separator */}
              <div className={`h-8 w-px ${
                scrolled ? "bg-gray-300" : "bg-white/30"
              }`}></div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                {authItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.4 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={item.link}
                      className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold overflow-hidden ${
                        scrolled 
                          ? "text-dark bg-gradient-to-r via-transparent" 
                          : "text-dark bg-white"
                      } ${item.color}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                        {item.name}
                      </span>
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className="w-3 h-3 relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { icon: faWhatsapp, color: "text-green-500", link: "#" },
                  { icon: faLinkedin, color: "text-blue-600", link: "#" },
                  { icon: faFacebook, color: "text-blue-700", link: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg ${
                      scrolled 
                        ? "bg-gray-100 hover:bg-gray-200" 
                        : "bg-white/10 hover:bg-white/20"
                    } ${social.color}`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700" 
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <FontAwesomeIcon 
                icon={isOpen ? faTimes : faBars} 
                className="w-5 h-5"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl z-40 lg:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
                  Navigation
                </h3>
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeNav === item.link
                          ? "bg-gradient-to-r from-[#ffb000]/10 to-yellow-500/10 text-[#ffb000] border-l-4 border-[#ffb000]"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      {activeNav === item.link && (
                        <motion.div
                          layoutId="mobileActive"
                          className="w-2 h-2 bg-[#ffb000] rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="space-y-3 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
                  Connexion
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {authItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                    >
                      <Link
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-center shadow-lg ${item.color} text-white`}
                      >
                        <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-gradient-to-r from-[#ffb000]/10 to-transparent rounded-2xl p-6 mb-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">Caristes actifs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      200+
                    </div>
                    <div className="text-sm text-gray-600">Entreprises</div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Social Links */}
              <div className="flex justify-center gap-4">
                {[
                  { icon: faWhatsapp, color: "bg-green-500", label: "WhatsApp" },
                  { icon: faLinkedin, color: "bg-blue-600", label: "LinkedIn" },
                  { icon: faFacebook, color: "bg-blue-700", label: "Facebook" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center`}>
                      <FontAwesomeIcon icon={social.icon} className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};