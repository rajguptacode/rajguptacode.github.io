// MAIN.JS — Raj Gupta Portfolio

// =====================
// TYPEWRITER EFFECT
// =====================
(function() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Cloud Engineer',
    'Python Developer',
    'Linux Enthusiast',
    'Network Explorer',
    'Tech Builder',
  ];

  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let pause      = false;

  function type() {
    const current = words[wordIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        pause = true;
        setTimeout(() => { pause = false; isDeleting = true; }, 1800);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
      }
    }

    if (!pause) {
      setTimeout(type, isDeleting ? 60 : 95);
    }
  }

  // Start after hero load animation
  setTimeout(type, 1800);
})();


// =====================
// NAVBAR — active link on scroll
// =====================
(function() {
  const links   = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Navbar background intensifies on scroll
    const nav = document.getElementById('navbar');
    if (nav) {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(10,5,25,0.92)';
        nav.style.borderColor = 'rgba(124,58,237,0.4)';
      } else {
        nav.style.background = 'rgba(15,10,30,0.7)';
        nav.style.borderColor = 'rgba(124,58,237,0.25)';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


// =====================
// SCROLL REVEAL ANIMATION
// (for future sections)
// =====================
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// =====================
// SMOOTH NAV CLICK
// =====================
document.querySelectorAll('.nav-link, .btn-primary, .btn-secondary').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


// =====================
// CURSOR GLOW EFFECT
// =====================
(function() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;
    width:300px;height:300px;
    border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
    pointer-events:none;
    z-index:0;
    transform:translate(-50%,-50%);
    transition:left 0.4s ease, top 0.4s ease;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();
