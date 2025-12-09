document.addEventListener("DOMContentLoaded", function() {

    /* ========================================= */
    /* 1. STAR BACKGROUND GENERATOR              */
    /* ========================================= */
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const numStars = 100;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    /* ========================================= */
    /* 2. MOUSE FOLLOWER (DESKTOP ONLY)          */
    /* ========================================= */
    const follower = document.getElementById('mouseFollower');
    
    // Only activate on devices with a fine pointer (Mouse) to save mobile battery
    if (window.matchMedia("(pointer: fine)").matches && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateFollower() {
            // Smooth easing
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
    } else if (follower) {
        // Hide on mobile
        follower.style.display = 'none';
    }

    /* ========================================= */
    /* 3. BUTTON RIPPLE EFFECT                   */
    /* ========================================= */
    // Adds the cool ripple to any button with class 'cta-button' or 'submit-btn'
    const buttons = document.querySelectorAll('.cta-button, .submit-btn, .btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't block links, just show effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = btn.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            btn.style.position = 'relative'; // Ensure button handles absolute child
            btn.style.overflow = 'hidden';   // Clip the ripple
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Inject Ripple Animation Style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { width: 300px; height: 300px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    /* ========================================= */
    /* 4. GALLERY PAGINATION SYSTEM              */
    /* ========================================= */
    // Only runs if the gallery container exists
    const galleryContainer = document.getElementById('gallery-container');
    const paginationContainer = document.getElementById('pagination-controls');

    if (galleryContainer && paginationContainer) {
        const itemsPerPage = 9; // MAX ITEMS PER PAGE
        const items = galleryContainer.querySelectorAll('.big-folder');
        const totalPages = Math.ceil(items.length / itemsPerPage);
        
        if (totalPages > 1) {
            let currentPage = 1;

            function showPage(page) {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                
                items.forEach((item, index) => {
                    if (index >= start && index < end) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                updateButtons(page);
                // Scroll to top of gallery gently
                const offsetTop = galleryContainer.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }

            function createButton(text, onClick, isActive = false) {
                const btn = document.createElement('button');
                btn.innerText = text;
                btn.onclick = onClick;
                btn.style.padding = '10px 15px';
                btn.style.margin = '0 5px';
                btn.style.background = isActive ? '#00d9ff' : 'rgba(255,255,255,0.1)';
                btn.style.border = '1px solid ' + (isActive ? '#00d9ff' : 'rgba(255,255,255,0.2)');
                btn.style.color = isActive ? '#000' : '#fff';
                btn.style.borderRadius = '5px';
                btn.style.cursor = 'pointer';
                btn.style.fontWeight = 'bold';
                return btn;
            }

            function updateButtons(activePage) {
                paginationContainer.innerHTML = '';
                
                // Previous
                if (activePage > 1) {
                    paginationContainer.appendChild(createButton('← Prev', () => { 
                        currentPage--; showPage(currentPage); 
                    }));
                }
                
                // Pages
                for (let i = 1; i <= totalPages; i++) {
                    paginationContainer.appendChild(createButton(i, () => { 
                        currentPage = i; showPage(currentPage); 
                    }, i === activePage));
                }
                
                // Next
                if (activePage < totalPages) {
                    paginationContainer.appendChild(createButton('Next →', () => { 
                        currentPage++; showPage(currentPage); 
                    }));
                }
            }

            // Initialize Gallery
            showPage(1);
        } else {
            // If less than 10 items, just show them all and hide controls
            paginationContainer.style.display = 'none';
        }
    }

    /* ========================================= */
    /* 5. FADE IN ANIMATION FOR SCROLLING        */
    /* ========================================= */
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-grid article, .video-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

});

