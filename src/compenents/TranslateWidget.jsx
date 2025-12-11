// TranslateWidget.jsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faChevronDown,
  faCheck,
  faSyncAlt,
  faLanguage,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

export default function TranslateWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("fr");
  const [loading, setLoading] = useState(false);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" }
  ];

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "fr",
          includedLanguages: "fr,ar,en,es,de,it,pt,ru",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false
        },
        "google_translate_element"
      );
      
      // Masquer l'interface par défaut de Google Translate
      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame { display: none !important; }
        .goog-te-menu-frame { 
          border: none !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3) !important;
          border-radius: 12px !important;
        }
        .goog-te-menu2 { 
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          border-radius: 12px !important;
        }
        .goog-te-menu2-item { 
          color: #d1d5db !important;
          padding: 12px 20px !important;
          font-family: inherit !important;
        }
        .goog-te-menu2-item:hover { 
          background: rgba(255, 176, 0, 0.1) !important;
        }
        .goog-te-menu2-item-selected { 
          background: rgba(255, 176, 0, 0.2) !important;
        }
        .skiptranslate iframe { 
          display: none !important; 
        }
      `;
      document.head.appendChild(style);
      
      setIsWidgetLoaded(true);
    };

    return () => {
      const script = document.querySelector('script[src*="translate.google.com"]');
      if (script) script.remove();
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    if (!window.google || !window.google.translate) return;
    
    setLoading(true);
    setCurrentLang(langCode);
    
    // Trouver et cliquer sur l'élément de langue correspondant
    setTimeout(() => {
      const langButtons = document.querySelectorAll('.goog-te-menu2-item');
      langButtons.forEach(button => {
        if (button.textContent.includes(languages.find(l => l.code === langCode)?.name || langCode)) {
          button.click();
        }
      });
      
      // Fermer le dropdown après sélection
      setIsOpen(false);
      setLoading(false);
      
      // Animation de confirmation
      setTimeout(() => {
        // Petite animation visuelle
        const element = document.getElementById('translate-confirmation');
        if (element) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
          }, 2000);
        }
      }, 300);
    }, 100);
  };

  const translatePage = () => {
    const translateBtn = document.querySelector('.goog-te-gadget');
    if (translateBtn) {
      translateBtn.click();
    }
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  return (
    <div className="relative">
      {/* Widget Google Translate caché */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* Notification de confirmation */}
      <div 
        id="translate-confirmation"
        className="fixed top-20 right-4 z-50 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-2xl transform transition-all duration-500 opacity-0 translate-y-[-10px] pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
          <span>Langue changée avec succès</span>
        </div>
      </div>

      {/* Bouton principal de traduction */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={loading}
          className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-[#FFB000]/20 hover:to-[#FF9500]/20 rounded-2xl border border-gray-700 hover:border-[#FFB000]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FFB000]/10 min-w-[180px] relative overflow-hidden"
        >
          {/* Effet d'arrière-plan animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000]/0 via-[#FFB000]/10 to-[#FFB000]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {/* Icône */}
          <div className="relative z-10">
            {loading ? (
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="w-5 h-5 text-[#FFB000] animate-spin" 
              />
            ) : (
              <FontAwesomeIcon 
                icon={faGlobe} 
                className="w-5 h-5 text-[#FFB000] group-hover:rotate-180 transition-transform duration-700" 
              />
            )}
          </div>
          
          {/* Texte */}
          <div className="flex flex-col items-start relative z-10">
            <span className="text-xs text-gray-400 group-hover:text-[#FFB000] transition-colors">
              Langue
            </span>
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-lg">{currentLanguage.flag}</span>
              {currentLanguage.name}
            </span>
          </div>
          
          {/* Flèche */}
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`w-3 h-3 text-gray-400 ml-auto relative z-10 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Menu déroulant des langues */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-3 w-64 bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up z-40 overflow-hidden">
            {/* Header du menu */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-3 text-white">
                <FontAwesomeIcon icon={faLanguage} className="w-5 h-5 text-[#FFB000]" />
                <div>
                  <h3 className="font-semibold">Sélectionnez la langue</h3>
                  <p className="text-xs text-gray-400 mt-1">Traduction automatique</p>
                </div>
              </div>
            </div>
            
            {/* Liste des langues */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-all duration-300 group ${
                    currentLang === language.code 
                      ? 'bg-gradient-to-r from-[#FFB000]/10 to-[#FF9500]/10 border-l-4 border-[#FFB000]' 
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  {/* Drapeau */}
                  <span className="text-2xl">{language.flag}</span>
                  
                  {/* Nom de la langue */}
                  <div className="flex-1 text-left">
                    <span className={`font-medium ${
                      currentLang === language.code ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {language.name}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">
                      {language.code.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Indicateur de sélection */}
                  {currentLang === language.code && (
                    <FontAwesomeIcon 
                      icon={faCheck} 
                      className="w-4 h-4 text-[#FFB000] animate-fade-in" 
                    />
                  )}
                  
                  {/* Effet de survol */}
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FontAwesomeIcon 
                      icon={faSyncAlt} 
                      className="w-4 h-4 text-gray-400 group-hover:text-[#FFB000] transition-colors" 
                    />
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer du menu */}
            <div className="p-4 border-t border-gray-700 bg-gray-900/50">
              <button
                onClick={translatePage}
                className="w-full py-2 px-4 bg-gradient-to-r from-[#FFB000] to-[#FF9500] text-white rounded-xl hover:shadow-lg hover:shadow-[#FFB000]/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faSyncAlt} className="w-4 h-4" />
                <span>Traduire la page</span>
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                Propulsé par Google Translate
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 176, 0, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 176, 0, 0.5);
        }
        
        /* Animation de pulse pour le bouton */
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 176, 0, 0);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 176, 0, 0.3);
          }
        }
        
        .group:hover .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
}