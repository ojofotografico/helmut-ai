/**
 * HELMUT AI — Main System Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZACIÓN DE IDIOMA
    const savedLang = localStorage.getItem('helmut-lang') || 'es';
    if (typeof window.setLanguage === 'function') {
        window.setLanguage(savedLang);
    }

    // 2. CONTROLADOR DE IDIOMA
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = savedLang === 'es' ? 'EN' : 'ES';
        langBtn.addEventListener('click', (e) => {
            const currentLang = document.documentElement.lang || 'es';
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            if (typeof window.setLanguage === 'function') {
                window.setLanguage(nextLang);
                e.target.textContent = nextLang === 'es' ? 'EN' : 'ES';
            }
        });
    }

    // 3. CONTROLADOR DE TEMA
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (typeof window.toggleTheme === 'function') {
                window.toggleTheme();
            }
        });
    }

   

    // 4. NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. INICIALIZAR RED NEURONAL
    initNeural();
});

/* ═══════════════════════════════════════════
   RED NEURONAL INTERACTIVA
   ════════════════════════════════════════════ */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function initNeural() {
    if (!canvas || !ctx) return;
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    }));
    animate();
}

function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cyanColor = getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim() || '#00E5FF';
    
    ctx.fillStyle = cyanColor;
    ctx.strokeStyle = cyanColor + '15'; 
    ctx.lineWidth = 0.8;

    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x !== null) {
            const dM = Math.hypot(mouse.x - p.x, mouse.y - p.y);
            if (dM < 180) {
                ctx.beginPath();
                ctx.strokeStyle = cyanColor + '30';
                ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
        }

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (d < 120) {
                ctx.beginPath();
                ctx.strokeStyle = cyanColor + '10';
                ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animate);
}
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const loader = document.getElementById('form-loader');
    const btn = form.querySelector('.btn-submit');
    
    // Ocultar botón y mostrar animaciones
    btn.style.display = 'none';
    loader.style.display = 'block';

    const steps = [
        { id: 'step-1', delay: 1200 },
        { id: 'step-2', delay: 2400 },
        { id: 'step-3', delay: 3600 }
    ];

    // Simulación de Checklist de Conversión
    steps.forEach((step, index) => {
        setTimeout(() => {
            const el = document.getElementById(step.id);
            el.classList.add('active');
            // Cambiar icono a check al terminar
            setTimeout(() => {
                el.querySelector('i').className = 'fas fa-check-circle';
                el.classList.add('done');
            }, 1000);
        }, step.delay);
    });

    // Envío Real a Formspree
    setTimeout(() => {
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                document.getElementById('final-step').style.display = 'block';
                form.reset();
            }
        });
    }, 5000); // Se envía tras completar el "checklist visual"
});