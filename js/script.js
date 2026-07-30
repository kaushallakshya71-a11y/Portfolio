/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const target = document.querySelector('header nav a[href*=' + id + ']');
                if (target) target.classList.add('active');
            });
        }
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle on scroll ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    /*==================== scroll progress bar ====================*/
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }

    /*==================== reveal animations ====================*/
    reveal();
    revealTimeline();
};

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: [
        'Full-Stack Developer',
        'ML & AI Engineer',
        'Computer Vision Learner',
        'Competitive Programmer'
    ],
    typeSpeed: 65,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});

/*==================== scroll reveal ====================*/
function reveal() {
    var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 80;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

/*==================== timeline reveal ====================*/
function revealTimeline() {
    var items = document.querySelectorAll(".timeline-item");
    for (var i = 0; i < items.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = items[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            items[i].classList.add("active");
        }
    }
}

/*==================== counter animation ====================*/
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

let countersStarted = false;
function checkCounters() {
    if (countersStarted) return;
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;
    const top = statsRow.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
        countersStarted = true;
        document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
    }
}

window.addEventListener('scroll', checkCounters);

/*==================== dark / light mode toggle ====================*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlEl = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'bx bx-sun';
    } else {
        themeIcon.className = 'bx bx-moon';
    }
}

/*==================== DOMContentLoaded ====================*/
window.addEventListener('DOMContentLoaded', () => {
    reveal();
    revealTimeline();
    checkCounters();

    /*==================== live photo change ====================*/
    const photoUpload = document.getElementById('photo-upload');
    const profileImg  = document.getElementById('profile-img');

    if (photoUpload && profileImg) {
        photoUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.style.opacity = '0';
                profileImg.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    profileImg.src = e.target.result;
                    profileImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    profileImg.style.opacity = '1';
                    profileImg.style.transform = 'scale(1)';
                }, 200);
            };
            reader.readAsDataURL(file);
        });
    }
});
