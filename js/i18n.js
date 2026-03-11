const translations = {
    es: {
        meta_title: "Helmut AI — Ingeniería de Precisión",
        nav_services: "Servicios",
        nav_academy: "Academia",
        nav_cta: "Briefing",
        // Aquí iremos sumando más textos de los siguientes bloques
    },
    en: {
        meta_title: "Helmut AI — Precision Engineering",
        nav_services: "Services",
        nav_academy: "Academy",
        nav_cta: "Briefing",
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Buscamos todos los elementos con el atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('helmut-lang', lang);
}

// Inicializar el idioma al cargar
(function initLang() {
    const savedLang = localStorage.getItem('helmut-lang') || 'es';
    // Esperamos un poco a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(savedLang);
        document.getElementById('lang-toggle').textContent = savedLang === 'es' ? 'EN' : 'ES';
    });
})();