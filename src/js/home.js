// Enhanced particle effect on mouse move
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    const colors = ['#ff1cf7', '#00f0ff', '#b026ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 10px ${randomColor};
        animation: particleFade 1.5s ease-out forwards;
        z-index: 5;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
};

// Throttle mouse move events
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 80) {
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                ${Math.random() * 60 - 30}px,
                ${Math.random() * 60 - 30}px
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero visual
window.addEventListener('mousemove', (e) => {
    const cyberFrame = document.querySelector('.cyber-frame');
    if (!cyberFrame) return;
    
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;
    
    cyberFrame.style.transform = `translate(${x}px, ${y}px)`;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations
window.addEventListener('load', () => {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.animation = `fadeInUp 0.6s ease forwards`;
            feature.style.opacity = '0';
        }, index * 100);
    });
});

// Add fadeInUp animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Add hover sound effect to buttons (optional - using visual feedback instead)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
});

// Random glitch effect occasionally
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    if (Math.random() > 0.7) {
        glitchElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = 'glitch-skew 5s infinite linear alternate-reverse';
            }, 10);
        });
    }
}, 5000);

console.log('%c🌸 Welcome to Girls Network! 🌸', 'color: #ff1cf7; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with 💖 by the Girls Development Team', 'color: #00f0ff; font-size: 14px;');