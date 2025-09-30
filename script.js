// script.js

// Fonction pour détecter si un élément est visible dans la fenêtre
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Sélectionne toutes les sections à animer
const sections = document.querySelectorAll('section');

// Fonction pour ajouter la classe 'visible' quand elles sont dans le viewport
function animateSections() {
  sections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('visible');
    }
  });
}

// Écoute le scroll et l'affichage initial
window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);
