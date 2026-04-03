// Function to switch between "Pages"
function navigateTo(viewId) {
    // 1. Hide the current view with a fade-out effect
    const app = document.getElementById('app');
    app.style.opacity = '0';
    
    setTimeout(() => {
        // 2. Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.add('hidden');
        });
        
        // 3. Show the requested view
        document.getElementById(viewId).classList.remove('hidden');
        
        // 4. Fade-in the app again
        app.style.opacity = '1';
    }, 400); // Match CSS transition time
}

// ============================================
// ADVANCED PARALLAX & SCROLL EFFECTS (GSAP)
// ============================================

// Wait for the window to load completely
window.onload = function() {
    
    // 1. Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 2. The Hero Text/Visual Parallax Effect
    // As you scroll, the background orbs should move slightly faster/slower than the text
    const layers = document.querySelectorAll('.parallax-layer');
    
    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        
        gsap.to(layer, {
            yPercent: (speed * 10), // Adjust this multiplier for intensity
            ease: 'none',
            scrollTrigger: {
                trigger: layer,
                start: 'top bottom', // When the layer's top hits the bottom of viewport
                end: 'bottom top',   // When layer's bottom hits top of viewport
                scrub: 1, // Smooth scrolling (higher number = smoother)
                // markers: true // Uncomment this to debug
            }
        });
    });

   
    gsap.from(".dashboard-widget", {
        scrollTrigger: {
            trigger: ".dashboard-overview",
            start: "top 80%", // Start animation when top of dashboard is 80% down viewport
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2, // Time between animating each widget
        ease: "power2.out"
    });

};