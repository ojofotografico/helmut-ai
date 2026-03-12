// js/theme.js

// Función global para cambiar el tema
window.toggleTheme = function() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('helmut-theme', newTheme);
    console.log("Tema cambiado a:", newTheme);
};

// Aplicar tema guardado inmediatamente (evita el destello)
(function() {
    const savedTheme = localStorage.getItem('helmut-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();