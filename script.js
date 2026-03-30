document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SCROLL REVEAL ANIMATIONS (Fixed to trigger correctly)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1  // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Runs only once
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-up
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 2. CUSTOM CURSOR LOGIC (Desktop Only)
    if (window.innerWidth > 900) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot instantly follows mouse
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with a slight delay for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect on Links and Buttons
        document.querySelectorAll('a, .hover-target').forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover-active');
                cursorDot.style.backgroundColor = 'transparent';
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover-active');
                cursorDot.style.backgroundColor = 'var(--accent)';
            });
        });

        // 3. 3D CARD TILT EFFECT (For Featured Projects)
        const cards = document.querySelectorAll('.tilt-card');
        
        cards.forEach(card => {
            const imageWrapper = card.querySelector('.project-image-wrapper');
            
            card.addEventListener('mousemove', (e) => {
                const rect = imageWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (reduced angles for subtler effect)
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                imageWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                imageWrapper.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseenter', () => {
                imageWrapper.style.transition = 'transform 0.1s ease';
            });
        });
    }
});
