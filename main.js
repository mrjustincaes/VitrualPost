document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    function handleRoute() {
        let hash = window.location.hash.substring(1) || 'home';
        
        pages.forEach(page => {
            page.classList.remove('active-page');
            page.querySelectorAll('.reveal').forEach(r => {
                r.classList.remove('active');
                observer.unobserve(r); 
            });
        });
        
        const targetPage = document.getElementById(`view-${hash}`) || document.getElementById('view-home');
        targetPage.classList.add('active-page');
        window.scrollTo(0, 0);

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${hash}` || (hash === 'home' && link.getAttribute('href') === '#home')) {
                link.classList.add('text-burgundy', 'font-semibold');
            } else {
                link.classList.remove('text-burgundy', 'font-semibold');
            }
        });
        
        setTimeout(() => {
            const reveals = targetPage.querySelectorAll(".reveal");
            reveals.forEach(reveal => observer.observe(reveal));
        }, 50);
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Cookie Banner Logic
    const banner = document.getElementById('cookie-banner');
    if (!localStorage.getItem('greenwaypost_cookie_consent')) {
        setTimeout(() => {
            if(banner) banner.classList.add('show');
        }, 1000);
    }
});

function acceptCookies() {
    localStorage.setItem('greenwaypost_cookie_consent', 'accepted');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.remove('show');
}

function rejectCookies() {
    localStorage.setItem('greenwaypost_cookie_consent', 'rejected');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.classList.remove('show');
}
