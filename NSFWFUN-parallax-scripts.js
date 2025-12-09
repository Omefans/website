document.addEventListener("DOMContentLoaded", function() {

    /* --- 1. STAR BACKGROUND --- */
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        // Create 100 stars with random positions and twinkling speeds
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

    /* --- 2. MOUSE FOLLOWER --- */
    const follower = document.getElementById('mouseFollower');
    
    // Check if device uses a fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches && follower) {
        
        // A. Movement Logic
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // B. Hover Interaction Logic
        // Selects links, buttons, and gallery items
        const interactables = document.querySelectorAll('a, button, input, textarea, .gallery-item');
        
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1.8)'; // Grow larger
                follower.style.borderColor = '#ffffff'; // Turn white
                follower.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)'; // Return to normal
                follower.style.borderColor = '#00d9ff'; // Return to Cyan (var(--primary))
                follower.style.background = 'rgba(255, 0, 234, 0.1)';
            });
        });

    } else if (follower) {
        // Hide custom cursor on touch/mobile devices
        follower.style.display = 'none';
    }

    /* --- 3. BUTTON RIPPLE EFFECT --- */
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            
            // Calculate click position relative to button
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            // Ripple Styles
            ripple.style.position = 'absolute';
            ripple.style.width = '20px'; 
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            // Ensure button handles overflow
            btn.style.position = 'relative'; 
            btn.style.overflow = 'hidden';
            
            btn.appendChild(ripple);
            
            // Remove ripple element after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add Keyframes for Ripple if not in CSS
    const style = document.createElement('style');
    style.textContent = `@keyframes ripple { to { width: 300px; height: 300px; opacity: 0; } }`;
    document.head.appendChild(style);

    /* --- 4. PAGINATION (UPDATED FOR GALLERY) --- */
    const gallery = document.getElementById('gallery-container');
    const controls = document.getElementById('pagination-controls');
    
    if (gallery && controls) {
        const limit = 9; // Number of items per page
        // Note: We are looking for .gallery-item based on the HTML provided earlier
        const items = Array.from(gallery.querySelectorAll('.gallery-item'));
        const totalPages = Math.ceil(items.length / limit);
        
        if (totalPages > 1) {
            
            // Function to show specific page
            function showPage(pageNumber) {
                // Scroll to top of gallery
                // window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: un-comment if you want auto-scroll

                // Loop through items and hide/show based on calculation
                items.forEach((item, index) => {
                    // Logic: Is the item index within the range of the current page?
                    if (index >= (pageNumber - 1) * limit && index < pageNumber * limit) {
                        item.style.display = 'flex'; // Use Flex or Block
                        item.style.animation = 'fadeIn 0.5s ease forwards'; // Add fade animation
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update Button Active States
                const btns = controls.querySelectorAll('.pagination-btn');
                btns.forEach(btn => {
                    btn.classList.remove('active');
                    if (parseInt(btn.innerText) === pageNumber) {
                        btn.classList.add('active');
                    }
                });
            }

            // Function to generate Numbered Buttons (1, 2, 3...)
            function createButtons() {
                controls.innerHTML = ''; // Clear previous buttons

                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement('button');
                    btn.innerText = i;
                    btn.className = 'pagination-btn'; // Matches CSS class provided earlier
                    
                    if (i === 1) btn.classList.add('active'); // First page active by default

                    btn.addEventListener('click', () => {
                        showPage(i);
                    });

                    controls.appendChild(btn);
                }
            }

            // Initialize
            createButtons();
            showPage(1);

        } else {
            // If less than 1 page, hide the controls area
            controls.style.display = 'none';
        }
    }
});
