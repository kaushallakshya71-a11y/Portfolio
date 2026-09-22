/**
 * LAKSHYA KAUSHAL - 2026 DEVELOPER PORTFOLIO
 * Main Client Script: Theme Toggle, Responsive Nav, Modals, Filters, Scroll Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. THEME ENGINE (DARK / LIGHT WITH LOCAL STORAGE PERSISTENCE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const rootHtml = document.documentElement;

    // Detect system preference or stored preference
    const storedTheme = localStorage.getItem('lk-portfolio-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootHtml.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        rootHtml.setAttribute('data-theme', theme);
        localStorage.setItem('lk-portfolio-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
        }
    }

    /* ==========================================================================
       2. RESPONSIVE NAVIGATION & STICKY HEADER
       ========================================================================== */
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scroll-progress');

    // Sticky Header and Scroll Progress
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (header) {
            header.classList.toggle('scrolled', scrollTop > 30);
        }

        if (scrollProgress && scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        highlightActiveNav();
    }, { passive: true });

    // Mobile Hamburger Toggle
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.contains('open');
            toggleMobileMenu(!isOpen);
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    });

    function toggleMobileMenu(open) {
        if (!navbar || !menuToggle) return;
        navbar.classList.toggle('open', open);
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (navOverlay) {
            navOverlay.classList.toggle('active', open);
            navOverlay.setAttribute('aria-hidden', open ? 'false' : 'true');
        }
        document.body.style.overflow = open ? 'hidden' : '';
    }

    // Active Section Spy
    const sections = document.querySelectorAll('section[id]');
    function highlightActiveNav() {
        const scrollPosition = window.pageYOffset + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ==========================================================================
       3. PROJECT DATA STORE & DETAILS MODAL
       ========================================================================== */
    const projectsData = {
        mistri: {
            title: 'Mistri – Smart Electronics Repair Management System',
            category: 'Full-Stack Platform',
            problem: 'Local electronics and device repair businesses frequently suffer from unorganized repair workflows, lack of transparent tracking for customers, manual invoice generation, and disconnected parts inventory.',
            solution: 'Engineered an enterprise-grade full-stack repair shop platform providing dedicated role-based interfaces for Admins, Staff Technicians, and Customers to manage repair tickets from reception to dispatch.',
            features: [
                'Role-Based Portals: Tailored views and permissions for Admins, Staff, and Customers with an 11-stage visual repair timeline.',
                'Bilingual AI Cost Estimator: RandomForest ML model with custom regex normalizer mapping 40+ Hinglish slang terms to diagnostic keywords, achieving sub-millisecond offline inference.',
                'QR Code & Real-Time Tracking: Instant job card verification for walk-in and pickup requests.',
                'Atomic Inventory Management: Stock deduction guards, low-stock alerts, and NPCI-compliant UPI QR billing.',
                'Automated Billing: GST PDF invoice generation using ReportLab.',
                'Security: JWT + RBAC security across 18 database tables (14/14 tests passing).'
            ],
            techStack: ['Python', 'FastAPI', 'Scikit-Learn', 'SQLite (WAL Mode)', 'JavaScript', 'JWT', 'ReportLab'],
            contribution: 'Architected the relational schema across 18 tables, trained the NLP cost-estimation model, developed secure RESTful endpoints with JWT + RBAC, created responsive dashboard interfaces, and implemented automated GST invoice generation.',
            githubUrl: 'https://github.com/kaushallakshya71-a11y',
            liveUrl: null
        },
        hirelens: {
            title: 'HireLens – AI Resume & Job Matching Platform',
            category: 'AI / ML & Web Platform',
            problem: 'Job seekers often face high ATS rejection rates due to formatting anomalies and keyword mismatches, while lacking actionable guidance on specific missing technical competencies.',
            solution: 'Constructed an intelligent resume auditing and matching platform that semantically evaluates resumes against target job descriptions, delivering precise fit scores and improvement roadmaps.',
            features: [
                'Semantic Context Matching: Evaluates candidate experience relevance using NLP achieving 95% matching accuracy across 9 integrated modules.',
                '9-Module ATS Diagnostic Suite: Comprehensive analysis covering formatting, action verbs, keyword densities, and section completeness.',
                'Skill Gap & Career Roadmap: Pinpoints missing credentials and suggests actionable learning paths.',
                'Live Deployment: Actively deployed on Render for real-world end-user access.'
            ],
            techStack: ['JavaScript', 'HTML5', 'CSS3', 'AI APIs', 'REST APIs', 'Node.js', 'Render'],
            contribution: 'Engineered the resume parsing and feature extraction modules, integrated semantic scoring algorithms, designed the frontend results dashboard, and deployed the production instance on Render.',
            githubUrl: 'https://github.com/kaushallakshya71-a11y',
            liveUrl: 'https://resumematch-ai-1.onrender.com'
        },
        buyorwait: {
            title: 'Buy-and-Wait – AI Financial Decision Agent',
            category: 'HackerRank Orchestrate Hackathon',
            problem: 'Consumers routinely struggle with impulsive purchase decisions without clear visibility into how a discretionary expense impacts their pending liabilities, cash flow, and upcoming monthly obligations.',
            solution: 'Developed an AI-powered financial decision agent in a 24-hour hackathon that determines whether a user can safely afford a requested expense by analyzing recurring payments, pending transactions, income, and payment options.',
            features: [
                'Purchase Affordability Scoring: Evaluates immediate and deferred financial impact of requested expenses.',
                'Multi-Source Data Processing: Ingested and processed 250 financial requests across CSV datasets (financial profiles, events, exchange rates, messages, images).',
                'Personalized Guidance: Generates tailored buy/wait/installment recommendations with clear contextual rationale.',
                'Competitive Achievement: Ranked #1927 out of 3,062 participants in HackerRank Orchestrate AI Agent Hackathon.'
            ],
            techStack: ['Python', 'AI/ML', 'Pandas', 'Data Processing', 'Financial Modeling'],
            contribution: 'Engineered the core decision logic and risk rating algorithms, parsed multi-modal financial request datasets, calculated safe spending boundaries, and verified model decision outputs under timed hackathon constraints.',
            githubUrl: 'https://github.com/kaushallakshya71-a11y',
            liveUrl: null
        },
        studentplus: {
            title: 'StudentPlus – ML-Based Dropout Prediction & Early Warning System',
            category: 'Predictive Analytics',
            problem: 'Educational institutions struggle to identify at-risk students until exam failures or formal dropout notices occur, missing opportunities for timely academic remediation.',
            solution: 'Trained and deployed a machine learning classification pipeline that monitors longitudinal student engagement metrics to predict dropout risk well in advance.',
            features: [
                'Predictive Risk Stratification: Assigns calibrated probability scores indicating academic distress.',
                'Multivariate Feature Processing: Analyzes attendance patterns, assignment submissions, and assessment trajectories.',
                'Administrator Visual Dashboard: Interactive charts enabling academic advisors to prioritize student interventions.',
                'Evaluated Benchmarks: Tested across precision-recall and longitudinal metric benchmarks.'
            ],
            techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Machine Learning'],
            contribution: 'Cleaned and normalized tabular academic data, conducted feature importance analysis, evaluated multiple classifiers, and delivered clear metric visualizations.',
            githubUrl: 'https://github.com/kaushallakshya71-a11y',
            liveUrl: null
        },
        portfolio: {
            title: 'Personal Developer Portfolio – Modern 2026 Edition',
            category: 'Web Engineering',
            problem: 'Developer portfolios frequently suffer from excessive heavy libraries, poor mobile ergonomics, missing accessibility semantics, and generic templates.',
            solution: 'Engineered a bespoke, lightweight portfolio strictly using standard HTML5, CSS3 Custom Properties, and modular JavaScript with zero external UI bloat.',
            features: [
                'Recruiter-Optimized Information Hierarchy: Standardized sections, verified timelines, and instant credential views.',
                'Full Dark & Light Dual-Theme Engine: Accessible color contrast compliance with persistent storage.',
                'Dynamic Modals & Filtering: Vanilla JS project filtering and accessible dialog overlays.'
            ],
            techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Node.js', 'Express'],
            contribution: 'Complete end-to-end design, implementation, asset optimization, accessibility tuning, and Express server routing.',
            githubUrl: 'https://github.com/kaushallakshya71-a11y/Portfolio',
            liveUrl: 'https://portfolio-1-ewg2.onrender.com'
        }
    };

    const projectModal = document.getElementById('project-modal');
    const projectModalContent = document.getElementById('modal-project-content');
    const projectModalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project-id');
            const data = projectsData[projectId];
            if (!data) return;

            renderProjectModal(data);
            openModal(projectModal);
        });
    });

    if (projectModalCloseBtn) {
        projectModalCloseBtn.addEventListener('click', () => {
            closeModal(projectModal);
        });
    }

    function renderProjectModal(data) {
        if (!projectModalContent) return;

        const liveButtonHtml = data.liveUrl
            ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class='bx bx-link-external'></i><span>Visit Live Demo</span></a>`
            : '';

        const techChipsHtml = data.techStack.map(tech => `<span>${tech}</span>`).join('');
        const featuresHtml = data.features.map(feat => `<li>${feat}</li>`).join('');

        projectModalContent.innerHTML = `
            <div class="modal-header-block">
                <span class="modal-category-tag">${data.category}</span>
                <h2 class="modal-project-title" id="modal-project-title">${data.title}</h2>
            </div>

            <h3 class="modal-section-title">The Problem</h3>
            <p class="modal-text">${data.problem}</p>

            <h3 class="modal-section-title">The Solution</h3>
            <p class="modal-text">${data.solution}</p>

            <h3 class="modal-section-title">Key Features</h3>
            <ul class="modal-bullets">${featuresHtml}</ul>

            <h3 class="modal-section-title">Technologies Used</h3>
            <div class="modal-tech-chips">${techChipsHtml}</div>

            <h3 class="modal-section-title">Engineering Contribution</h3>
            <p class="modal-text">${data.contribution}</p>

            <div class="modal-actions-row">
                ${liveButtonHtml}
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <i class='bx bxl-github'></i>
                    <span>View on GitHub</span>
                </a>
            </div>
        `;
    }

    /* ==========================================================================
       4. CERTIFICATE MODAL WITH IMAGE LIGHTBOX SUPPORT
       ========================================================================== */
    const certModal = document.getElementById('cert-modal');
    const certModalContent = document.getElementById('modal-cert-content');
    const certModalCloseBtn = document.getElementById('modal-cert-close-btn');

    document.querySelectorAll('.btn-cert-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = btn.getAttribute('data-cert-title');
            const issuer = btn.getAttribute('data-cert-issuer');
            const desc = btn.getAttribute('data-cert-desc');
            const image = btn.getAttribute('data-cert-image');

            renderCertModal(title, issuer, desc, image);
            openModal(certModal);
        });
    });

    if (certModalCloseBtn) {
        certModalCloseBtn.addEventListener('click', () => {
            closeModal(certModal);
        });
    }

    function renderCertModal(title, issuer, desc, image) {
        if (!certModalContent) return;

        const imageHtml = image
            ? `<div class="cert-lightbox-container" style="margin: 1.6rem 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-hover); box-shadow: var(--shadow-md);">
                 <img src="${image}" alt="${title}" style="width: 100%; height: auto; display: block;">
               </div>`
            : '';

        certModalContent.innerHTML = `
            <div class="modal-header-block">
                <span class="modal-category-tag">${issuer}</span>
                <h2 class="modal-project-title" id="modal-cert-title">${title}</h2>
            </div>
            ${imageHtml}
            <h3 class="modal-section-title">Verification &amp; Curriculum</h3>
            <p class="modal-text">${desc}</p>
            <div class="modal-actions-row" style="margin-top: 2rem;">
                <a href="assets/Lakshya_Kaushal_Resume.html" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <i class='bx bx-file'></i>
                    <span>Verify via Resume Profile</span>
                </a>
                ${image ? `<a href="${image}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class='bx bx-expand'></i><span>View Full Size</span></a>` : ''}
            </div>
        `;
    }

    // Generic Modal Open/Close Helpers
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Close Modals on Backdrop Click or ESC Key
    [projectModal, certModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(projectModal);
            closeModal(certModal);
            toggleMobileMenu(false);
        }
    });

    /* ==========================================================================
       5. PROJECT FILTER CONTROLS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       6. STATS COUNTER ANIMATION (INTERSECTION OBSERVER)
       ========================================================================== */
    const statFigures = document.querySelectorAll('.stat-figure');
    let hasAnimatedStats = false;

    if (statFigures.length > 0 && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedStats) {
                    hasAnimatedStats = true;
                    runStatsAnimation();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const statsContainer = document.querySelector('.stats-counter-row');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }
    } else {
        runStatsAnimation();
    }

    function runStatsAnimation() {
        statFigures.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1600;
            const frameRate = 30;
            const totalFrames = Math.round(duration / (1000 / frameRate));
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const current = Math.round(target * progress);

                if (frame >= totalFrames) {
                    el.textContent = target;
                    clearInterval(counter);
                } else {
                    el.textContent = current;
                }
            }, 1000 / frameRate);
        });
    }
});
