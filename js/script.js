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
};

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: [
        'Full-Stack Developer',
        'ML &amp; AI Engineer',
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

window.addEventListener("scroll", reveal);

// Trigger reveal on load
window.addEventListener('DOMContentLoaded', () => {
    reveal();

    /*==================== live photo change ====================*/
    const photoUpload = document.getElementById('photo-upload');
    const profileImg  = document.getElementById('profile-img');

    if (photoUpload && profileImg) {
        photoUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (!file) return;

            // Only accept images
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                // Smooth fade-in transition
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
