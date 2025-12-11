// HeaderWithTranslate.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBars,
  faTimes,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

// Composant pour le widget de traduction (placeholder pour l'intégration future)
function TranslateWidget() {
  return (
    <div className="space-y-2">
      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition">
        العربية
      </button>
      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition">
        Français
      </button>
      <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition">
        English
      </button>
    </div>
  );
}

export default function HeaderWithTranslate() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Détecter le scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer menu mobile au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-lg shadow-2xl shadow-black/30 py-3"
            : "bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">


            {/* Actions Droites */}
            <div className="flex items-center space-x-4">
              {/* Dropdown Langue */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700 hover:border-[#FFB000]/50 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 text-[#FFB000]" />
                  <span className="text-gray-300 font-medium">Langue</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl shadow-black/50 animate-fade-in-up">
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-3 flex items-center">
                        <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 mr-2 text-[#FFB000]" />
                        Sélectionnez votre langue
                      </h3>
                      <TranslateWidget />
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-xs text-gray-400">Traduction automatique future</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bouton Menu Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 text-gray-300 hover:text-white rounded-xl hover:bg-gray-800/50 transition-all duration-300"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 bg-gray-800/95 backdrop-blur-xl border-t border-gray-700">
            <div className="space-y-4">
              {/* Vous pouvez ajouter des liens mobile ici */}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
      `}</style>
    </>
  );
}
