document.addEventListener("DOMContentLoaded", function() {

    /* 1. STAR BACKGROUND */
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    /* 2. MOUSE FOLLOWER (Updated with Hover Effects) */
    const follower = document.getElementById('mouseFollower');
    
    // Check if device uses a fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches && follower) {
        
        // A. Movement Logic
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // B. Hover Interaction Logic (Added to restore full functionality)
        // This makes the cursor grow when hovering over links, buttons, or gallery items
        const interactables = document.querySelectorAll('a, button, input, textarea, .gallery-item');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1.8)'; // Grow larger
                follower.style.borderColor = '#ffffff'; // Turn white
                follower.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)'; // Return to normal
                follower.style.borderColor = 'rgba(0, 234, 255, 0.8)'; // Return to Cyan
                follower.style.background = 'rgba(208, 0, 255, 0.1)';
            });
        });

    } else if (follower) {
        // Hide custom cursor on touch devices
        follower.style.display = 'none';
    }

    /* 3. BUTTON RIPPLE */
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.width = '20px'; ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            btn.style.position = 'relative'; btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    const style = document.createElement('style');
    style.textContent = `@keyframes ripple { to { width: 300px; height: 300px; opacity: 0; } }`;
    document.head.appendChild(style);

    /* 4. PAGINATION (Limit 9) */
    const gallery = document.getElementById('gallery-container');
    const controls = document.getElementById('pagination-controls');
    
    if (gallery && controls) {
        const limit = 9; // LIMIT SET TO 9 ITEMS
        const items = gallery.querySelectorAll('.big-folder');
        const pages = Math.ceil(items.length / limit);
        
        if (pages > 1) {
            let curr = 1;
            function render(p) {
                items.forEach((item, i) => {
                    item.style.display = (i >= (p-1)*limit && i < p*limit) ? 'block' : 'none';
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                controls.innerHTML = '';
                if(curr > 1) {
                    const prev = document.createElement('button');
                    prev.innerText = '←'; prev.className = 'cta-button'; prev.style.padding = '10px 20px';
                    prev.onclick = () => { curr--; render(curr); };
                    controls.appendChild(prev);
                }
                if(curr < pages) {
                    const next = document.createElement('button');
                    next.innerText = '→'; next.className = 'cta-button'; next.style.padding = '10px 20px';
                    next.onclick = () => { curr++; render(curr); };
                    controls.appendChild(next);
                }
            }
            render(1);
        } else { controls.style.display = 'none'; }
    }
});
