document.addEventListener('DOMContentLoaded', () => {
    // Listener para el Tema
    document.getElementById('theme-toggle').addEventListener('click', () => {
        toggleTheme(); // Función definida en theme.js
    });

    // Listener para Idioma
    document.getElementById('lang-toggle').addEventListener('click', (e) => {
        const currentLang = document.documentElement.lang;
        const nextLang = currentLang === 'es' ? 'en' : 'es';
        setLanguage(nextLang); // Definiremos esto en i18n.js
        e.target.textContent = nextLang === 'es' ? 'EN' : 'ES';
    });
});