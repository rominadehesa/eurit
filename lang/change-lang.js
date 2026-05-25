const btn   = document.getElementById('langBtn');
const menu  = document.getElementById('langMenu');
const label = document.getElementById('langLabel');

// ── Carga y aplica las traducciones del JSON ──
async function loadLang(lang) {
    try {
        const res = await fetch(`lang/${lang}.json`);
        if (!res.ok) throw new Error(`No se pudo cargar lang/${lang}.json`);

        const translations = await res.json();
        applyTranslations(translations);
        localStorage.setItem('preferred_lang', lang);
    } catch (err) {
        console.error('[i18n]', err);
    }
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key   = el.getAttribute('data-i18n');
        const value = resolveKey(key, translations);

        if (value === null) {
            console.warn(`[i18n] Clave no encontrada: "${key}"`);
            return;
        }

        if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', value);
        } else {
            el.textContent = value;
        }
    });
}

// Soporta claves simples ("hero-title") y anidadas ("hero.title")
function resolveKey(key, obj) {
    return key.split('.').reduce((acc, part) => {
        return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
}

// ── Selector de idioma ──
function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
}

function selectLang(el) {
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
    });

    el.classList.add('active');
    el.setAttribute('aria-selected', 'true');
    label.textContent = el.dataset.code;
    toggleMenu();

    // Carga el JSON del idioma elegido (it → it.json, es → es.json)
    loadLang(el.dataset.code.toLowerCase());
}

document.addEventListener('click', function(e) {
    if (!document.getElementById('langSelector').contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }
});

// ── Init: carga el idioma guardado o italiano por defecto ──
const initialLang = localStorage.getItem('preferred_lang') || 'it';
loadLang(initialLang);

// Sincroniza el botón con el idioma inicial
document.querySelectorAll('.lang-option').forEach(opt => {
    const isActive = opt.dataset.code.toLowerCase() === initialLang;
    opt.classList.toggle('active', isActive);
    opt.setAttribute('aria-selected', isActive);
    if (isActive) label.textContent = opt.dataset.code;
});