if (!window.__SNEHA_PORTFOLIO_INIT__) {
  window.__SNEHA_PORTFOLIO_INIT__ = true;
/**
 * Sneha Developer Portfolio - Main Interactive Script
 * High performance, zero dependencies, accessible vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initMobileDrawer();
  initSkillFilters();
  initProjectFilters();
  initMedicineDemoModal();
  initResumeModal();
  initContactActions();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('sneha-theme') || 'light';

  applyTheme(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('sneha-theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  themeToggleBtns.forEach(btn => {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    
    // Update SVG icon inside
    btn.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  });
}

/* ==========================================================================
   2. Sticky Navigation & Scrollspy
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer || !overlay || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. Skills Filtering
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skills-category-group');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillGroups.forEach(group => {
        const groupCat = group.getAttribute('data-category');
        if (filter === 'all' || filter === groupCat) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Projects Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Medicine Recommendation System Concept Simulator Modal
   ========================================================================== */
function initMedicineDemoModal() {
  const openBtn = document.getElementById('openDemoModalBtn');
  const modal = document.getElementById('medicineDemoModal');
  const closeBtn = document.getElementById('closeDemoModalBtn');
  const symptomChips = document.querySelectorAll('.symptom-chip');
  const resetBtn = document.getElementById('resetSymptomBtn');
  
  // Results elements
  const conditionEl = document.getElementById('demoPredictedCondition');
  const confidenceEl = document.getElementById('demoConfidence');
  const medicinesListEl = document.getElementById('demoMedicinesList');
  const adviceEl = document.getElementById('demoAdvice');

  if (!modal || !openBtn) return;

  // Knowledge base simulated model
  const diseaseDatabase = [
    {
      condition: "Common Cold / Viral Upper Respiratory Syndrome",
      symptoms: ["cough", "sore-throat", "sneezing", "congestion"],
      medicines: [
        { name: "Paracetamol 500mg", type: "Analgesic / Antipyretic", note: "For general malaise and discomfort" },
        { name: "Cetirizine 10mg", type: "Antihistamine", note: "Relieves runny nose and sneezing" },
        { name: "Saline Nasal Spray", type: "Decongestant", note: "Provides natural nasal passage relief" }
      ],
      advice: "Adequate hydration, warm steam inhalation, and sufficient rest for 3â€“5 days."
    },
    {
      condition: "Seasonal Viral Influenza (Flu-like Syndrome)",
      symptoms: ["fever", "body-ache", "fatigue", "headache", "chills"],
      medicines: [
        { name: "Paracetamol 650mg", type: "Antipyretic", note: "For fever reduction and body ache control" },
        { name: "Oral Rehydration Salts (ORS)", type: "Electrolytes", note: "Maintains optimal hydration balance" },
        { name: "Vitamin C & Zinc", type: "Immune Support", note: "Supportive immune recovery therapy" }
      ],
      advice: "Monitor temperature twice daily. Consult a registered physician if fever persists > 3 days."
    },
    {
      condition: "Tension Headache / Fatigue Strain",
      symptoms: ["headache", "fatigue"],
      medicines: [
        { name: "Paracetamol or Ibuprofen", type: "Pain Relief", note: "Mild analgesic under supervision" },
        { name: "Hydration Therapy", type: "Natural Remedy", note: "Drink 2-3 liters of clean water daily" }
      ],
      advice: "Reduce screen time, improve posture, and take regular rest intervals."
    },
    {
      condition: "Mild Pharyngitis / Sore Throat",
      symptoms: ["sore-throat", "cough"],
      medicines: [
        { name: "Lozenges (e.g., Strepsils)", type: "Soothing Agent", note: "Relieves throat irritation" },
        { name: "Warm Salt Water Gargle", type: "Antiseptic Wash", note: "Repeat 3 times daily" }
      ],
      advice: "Avoid cold or irritant foods; sip warm fluids frequently."
    }
  ];

  function evaluateSymptoms() {
    const selected = Array.from(document.querySelectorAll('.symptom-chip.selected'))
      .map(chip => chip.getAttribute('data-symptom'));

    if (selected.length === 0) {
      conditionEl.textContent = "Please select one or more symptoms above";
      confidenceEl.textContent = "â€”";
      medicinesListEl.innerHTML = `<li style="color: var(--text-muted);">No recommendations yet. Click symptoms to run prediction.</li>`;
      adviceEl.textContent = "Select symptoms to analyze probable conditions.";
      return;
    }

    // Match best disease based on symptom overlap score
    let bestMatch = null;
    let highestScore = -1;

    diseaseDatabase.forEach(item => {
      let score = 0;
      item.symptoms.forEach(sym => {
        if (selected.includes(sym)) score += 1;
      });
      if (score > highestScore && score > 0) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch) {
      const matchPct = Math.min(95, Math.round((highestScore / bestMatch.symptoms.length) * 100));
      conditionEl.textContent = bestMatch.condition;
      confidenceEl.textContent = `${matchPct}% Match Score`;
      
      medicinesListEl.innerHTML = bestMatch.medicines.map(m => `
        <li style="margin-bottom: 8px;">
          <strong>${m.name}</strong> 
          <span style="font-size:0.8rem; background:var(--badge-bg); padding:2px 8px; border-radius:12px; margin-left:6px;">${m.type}</span>
          <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">${m.note}</div>
        </li>
      `).join('');

      adviceEl.textContent = bestMatch.advice;
    } else {
      conditionEl.textContent = "General Symptomatic Profile";
      confidenceEl.textContent = "Preliminary Analysis";
      medicinesListEl.innerHTML = `<li>Consult a healthcare professional for customized diagnosis based on the combined symptoms: ${selected.join(', ')}.</li>`;
      adviceEl.textContent = "Rest well, drink clean fluids, and consult a doctor.";
    }
  }

  symptomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const isSelected = chip.classList.contains('selected');
      chip.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      evaluateSymptoms();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      symptomChips.forEach(chip => {
        chip.classList.remove('selected');
        chip.setAttribute('aria-pressed', 'false');
      });
      evaluateSymptoms();
    });
  }

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    evaluateSymptoms();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Resume Modal & Print Functionality
   ========================================================================== */
function initResumeModal() {
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const modal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeResumeModalBtn');
  const printBtn = document.getElementById('printResumeBtn');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', openResume);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   8. Contact Actions (Copy Email & Interactive Mail Composer)
   ========================================================================== */
function initContactActions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactForm = document.getElementById('contactForm');
  const emailVal = "acharsneha07@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal).then(() => {
        showToast("Email address copied to clipboard!");
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = emailVal;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast("Email address copied to clipboard!");
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('messageSubject').value.trim() || `Portfolio Inquiry from ${name}`;
      const message = document.getElementById('messageBody').value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      // Generate mailto link
      const mailtoUrl = `mailto:${emailVal}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Hello Sneha,\n\nMy name is ${name} (${email}).\n\n${message}\n\nSent via Developer Portfolio Website`
      )}`;

      showToast("Opening your email client...");
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);
    });
  }
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;
  
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

}
