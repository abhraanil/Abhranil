// Scroll reveal with reverse animation
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // reverse animation
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  }
);

reveals.forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Nav auto-hide with scroll velocity control
const nav = document.querySelector('.nav');
let lastScrollY = window.scrollY;
let lastTime = Date.now();
let ticking = false;

function handleNavVisibility() {
  const currentScrollY = window.scrollY;
  const currentTime = Date.now();

  const deltaY = currentScrollY - lastScrollY;
  const deltaTime = currentTime - lastTime;

  const velocity = Math.abs(deltaY / deltaTime); // px per ms

  if (deltaY > 0 && currentScrollY > 120) {
    // scrolling down
    nav.classList.add('nav-hidden');
  } else if (velocity < 0.15) {
    // scrolling up slowly or stopped
    nav.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
  lastTime = currentTime;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleNavVisibility);
    ticking = true;
  }
});


// Active section highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.4
  }
);

sections.forEach(section => sectionObserver.observe(section));


// Mobile demo slider snap refinement
const demoGrid = document.querySelector('.demo-grid');

if (demoGrid && window.innerWidth <= 768) {
  let isScrolling;

  demoGrid.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      const cards = demoGrid.querySelectorAll('.demo-card');
      const scrollLeft = demoGrid.scrollLeft;

      let closestCard = cards[0];
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardLeft = card.offsetLeft;
        const distance = Math.abs(cardLeft - scrollLeft);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      demoGrid.scrollTo({
        left: closestCard.offsetLeft,
        behavior: 'smooth'
      });
    }, 80);
  });
}
