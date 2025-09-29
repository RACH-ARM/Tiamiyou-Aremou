// ====== FADE-IN AU SCROLL ======
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in, .fade-in-up").forEach(el => observer.observe(el));


// ====== SIDEBAR TOGGLE ======
const burger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

burger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  burger.classList.toggle('active');
  document.body.classList.toggle('sidebar-active');
});

// Fermer sidebar en cliquant sur overlay
document.body.addEventListener('click', e => {
  if(e.target === document.body && document.body.classList.contains('sidebar-active')){
    sidebar.classList.remove('open');
    burger.classList.remove('active');
    document.body.classList.remove('sidebar-active');
  }
});


// ====== SCROLL GLOW MOBILE ======
if(window.innerWidth < 768){
  const sections = document.querySelectorAll('.section-card');

  function getActiveSection(){
    const center = window.innerHeight / 2;
    let active = null;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if(rect.top < center && rect.bottom > center){
        active = section;
      }
    });
    return active;
  }

  function handleScroll(){
    sections.forEach(section => section.classList.remove('scroll-glow-active'));
    const current = getActiveSection();
    if(current) current.classList.add('scroll-glow-active');
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}
// Animation des barres de compétences avec effet shine
const skillCards = document.querySelectorAll('.skill-card');

const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const card = entry.target;
      const percent = card.getAttribute('data-percent');
      const bar = card.querySelector('.progress-bar');
      const text = card.querySelector('.progress-text');

      bar.style.width = percent + '%';

      let count = 0;
      const interval = setInterval(() => {
        if(count >= percent){
          clearInterval(interval);
        } else {
          count++;
          text.textContent = count + '%';
        }
      }, 15);

      skillsObserver.unobserve(card);
    }
  });
}, { threshold: 0.5 });

skillCards.forEach(card => skillsObserver.observe(card));
