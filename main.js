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
        
        // Hide all pages and reset animations
        const pages = document.querySelectorAll('.page-view');
        pages.forEach(page => {
            page.classList.remove('active-page');
            page.querySelectorAll('.reveal').forEach(r => {
                r.classList.remove('active');
                observer.unobserve(r); // Stop tracking hidden elements
            });
        });
        
        // Look for the requested page
        const targetPage = document.getElementById(`view-${hash}`);
        
        // ROUTING LOGIC UPDATE:
        if (targetPage) {
            // If the page exists, show it
            targetPage.classList.add('active-page');
        } else {
            // If the page DOES NOT exist, show the 404 page instead of the homepage
            document.getElementById('view-404').classList.add('active-page');
            
            // Optional: Remove active styling from nav links since they aren't on a real page
            navLinks.forEach(link => link.classList.remove('text-burgundy', 'font-semibold'));
        }
        
        window.scrollTo(0, 0);

        // Update navigation highlights (only if the page exists)
        if (targetPage) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${hash}` || (hash === 'home' && link.getAttribute('href') === '#home')) {
                    link.classList.add('text-burgundy', 'font-semibold');
                } else {
                    link.classList.remove('text-burgundy', 'font-semibold');
                }
            });
        }
        
        // Wait for display:flex to fully render, then trigger animations
        setTimeout(() => {
            const activeReveals = document.querySelector('.active-page').querySelectorAll(".reveal");
            activeReveals.forEach(reveal => observer.observe(reveal));
        }, 50);
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
