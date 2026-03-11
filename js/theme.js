/**
 * HELMUT AI — Theme Engine
 * Gestiona el cambio entre modo claro y oscuro con persistencia.
 */

(function initTheme() {
    // Comprobar si hay un tema guardado o usar 'dark' por defecto
    const savedTheme = localStorage.getItem('helmut-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Aplicar cambio
    html.setAttribute('data-theme', newTheme);
    
    // Persistir en el navegador
    localStorage.setItem('helmut-theme', newTheme);
    
    console.log(`Sistema Helmut AI: Tema cambiado a ${newTheme}`);
}