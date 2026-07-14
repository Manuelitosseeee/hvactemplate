// Minimal JS for animations, mobile menu, simple counter and smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    const nav = document.querySelector('.nav');
    if (nav) nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) {
        e.preventDefault();
        tgt.scrollIntoView({behavior:'smooth', block:'start'});
        history.replaceState(null, '', a.getAttribute('href'));
      }
    });
  });

  // Intersection Observer to animate in-view elements
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // once visible, unobserve to avoid re-trigger
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

  // Simple count-up animation for stat
  const stat = document.querySelector('.stat-value');
  if (stat) {
    const target = +stat.getAttribute('data-count') || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(()=>{
      current += step;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(interval);
      } else {
        stat.textContent = current;
      }
    }, 12);
  }

  // Fake contact submit (prevent page reload). Replace with AJAX or form action.
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Inviando...';
      // Simulate success
      setTimeout(()=>{
        submit.textContent = 'Inviato';
        form.reset();
        submit.disabled = false;
      }, 900);
    });
  }
});
